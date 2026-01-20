import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

interface BookingEmailData {
  client: {
    name: string;
    email: string;
  };
  mentor: {
    name: string;
    email: string;
  };
  slot: Date;
}

@Injectable()
export class EmailService {
  private resend: Resend;
  private readonly INDIAN_TZ = 'Asia/Kolkata';

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('email.resendApiKey') || '';
    this.resend = new Resend(apiKey);
  }

  private formatDateTime(dateTime: Date): {
    formattedDate: string;
    formattedTime: string;
  } {
    const date = new Date(dateTime);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: this.INDIAN_TZ,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-IN', options);
    const formattedTime = date.toLocaleTimeString('en-IN', {
      timeZone: this.INDIAN_TZ,
      hour: '2-digit',
      minute: '2-digit',
    });
    return { formattedDate, formattedTime };
  }

  private generateClientEmailContent(bookingData: BookingEmailData): string {
    const { formattedDate, formattedTime } = this.formatDateTime(
      bookingData.slot,
    );

    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>Dear ${bookingData.client.name},</p>

        <p>We are pleased to confirm your 1:1 meeting with <strong>${bookingData.mentor.name}</strong>.</p>

        <p><strong>Details of your booking:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${formattedTime} IST</li>
          <li><strong>Mentor:</strong> ${bookingData.mentor.name}</li>
        </ul>

        <p>Please make sure to join with your registered email ID. You can check the <strong>Bookings</strong> section for more details about the meeting.</p>

        <p>If you have any questions or need to reschedule, please don't hesitate to contact us.</p>

        <p>We look forward to your productive session.</p>

        <p>Best regards,<br/>The Pretest Team</p>
      </div>
    `;
  }

  private generateMentorEmailContent(bookingData: BookingEmailData): string {
    const { formattedDate, formattedTime } = this.formatDateTime(
      bookingData.slot,
    );

    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>Dear ${bookingData.mentor.name},</p>

        <p>This is to inform you that a 1:1 meeting has been scheduled with <strong>${bookingData.client.name}</strong>.</p>

        <p><strong>Details of the meeting:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${formattedTime} IST</li>
          <li><strong>Client:</strong> ${bookingData.client.name}</li>
        </ul>

        <p>Please ensure to join with your registered email ID. You can check the <strong>Bookings</strong> section for more details about the meeting.</p>

        <p>Please prepare accordingly. If you need to make any changes, feel free to reach out to us.</p>

        <p>Best regards,<br/>The Pretest Team</p>
      </div>
    `;
  }

  private validateBookingData(bookingData: BookingEmailData): void {
    if (
      !bookingData.client ||
      !bookingData.client.email ||
      !bookingData.client.name
    ) {
      throw new Error('Client information is missing.');
    }
    if (
      !bookingData.mentor ||
      !bookingData.mentor.name ||
      !bookingData.mentor.email
    ) {
      throw new Error('Mentor information is missing.');
    }
    if (!bookingData.slot) {
      throw new Error('Booking slot information is missing.');
    }
  }

  async sendBookingConfirmationEmail(
    bookingData: BookingEmailData,
  ): Promise<void> {
    try {
      this.validateBookingData(bookingData);

      // Send email to client
      const { error: clientError } = await this.resend.emails.send({
        from: 'no-reply@pretest.site',
        to: bookingData.client.email,
        subject: `1:1 Meeting Confirmed with ${bookingData.mentor.name}`,
        html: this.generateClientEmailContent(bookingData),
      });

      if (clientError) {
        throw new Error(
          `Failed to send email to client: ${clientError.message}`,
        );
      }

      // Send email to mentor
      const { error: mentorError } = await this.resend.emails.send({
        from: 'no-reply@pretest.site',
        to: bookingData.mentor.email,
        subject: `1:1 Meeting Scheduled with ${bookingData.client.name}`,
        html: this.generateMentorEmailContent(bookingData),
      });

      if (mentorError) {
        throw new Error(
          `Failed to send email to mentor: ${mentorError.message}`,
        );
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error in sendBookingConfirmationEmail:', message);
    }
  }
}
