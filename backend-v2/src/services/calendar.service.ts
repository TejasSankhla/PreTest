import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

interface CalendarEventOptions {
  startTime: Date;
  summary: string;
  location: string;
  client: string; // client email
  mentor: string; // mentor email
}

@Injectable()
export class CalendarService {
  private oauth2Client: any;

  constructor(private readonly configService: ConfigService) {
    const clientId = this.configService.get<string>('google.clientId');
    const clientSecret = this.configService.get<string>('google.clientSecret');
    const refreshToken = this.configService.get<string>('google.refreshToken');

    const { OAuth2 } = google.auth;
    this.oauth2Client = new OAuth2(clientId, clientSecret);
    this.oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });
  }

  async createEvent(options: CalendarEventOptions): Promise<string> {
    const startTime = new Date(options.startTime);
    const endTime = new Date(options.startTime);
    endTime.setHours(endTime.getHours() + 1);

    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    const event = {
      summary: options.summary,
      location: options.location,
      description: options.summary + '\n' + '\nSession Duration: 60 Minutes',
      colorId: '1',
      conferenceData: {
        createRequest: {
          requestId: 'req_' + Math.random().toString(36).substring(7),
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      attendees: [
        { email: options.client, responseStatus: 'needsAction' },
        { email: options.mentor, organizer: true, responseStatus: 'needsAction' },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
      guestsCanSeeOtherGuests: false,
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: event,
    });

    return response.data.hangoutLink || '';
  }
}
