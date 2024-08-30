import { google } from "googleapis";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
} from "../config/server-config.js";
const { OAuth2 } = google.auth;
async function createEvent(options) {
  let startTime = options.startTime;

  let endTime = new Date(options.startTime);

  endTime.setHours(endTime.getHours() + 1);

  let oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET);

  oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  let calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const event = {
    summary: options.summary,
    location: options.location,
    description: options.summary + "\n" + "\nSession Duration: 60 Minutes",
    colorId: 1,
    conferenceData: {
      createRequest: {
        requestId: "7qxalsvy0e",
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    start: {
      dateTime: startTime,
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: endTime,
      timeZone: "Asia/Kolkata",
    },
    attendees: [
      { email: options.client, responseStatus: "needsAction" },
      { email: options.mentor, organizer: true, responseStatus: "needsAction" },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 60 },
        { method: "popup", minutes: 10 },
      ],
    },
    guestsCanSeeOtherGuests: false,
  };

  let link = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: "1",
    resource: event,
  });

  return link.data.hangoutLink;
}

export { createEvent };
