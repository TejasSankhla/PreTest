import { Resend } from "resend";
import { Resend_API_KEY } from "../config/server-config.js";

const resend = new Resend(Resend_API_KEY);
const INDIAN_TZ = 'Asia/Kolkata';

// Function to format date and time in Indian Time Zone using native JavaScript
function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const options = { timeZone: INDIAN_TZ, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-IN', options);
  const formattedTime = date.toLocaleTimeString('en-IN', { timeZone: INDIAN_TZ, hour: '2-digit', minute: '2-digit' });
  return { formattedDate, formattedTime };
}

// Generate the HTML content for the client's email
function generateClientEmailContent(bookingData) {
  const { formattedDate, formattedTime } = formatDateTime(bookingData.slot);

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

// Generate the HTML content for the mentor's email
function generateMentorEmailContent(bookingData) {
  const { formattedDate, formattedTime } = formatDateTime(bookingData.slot);

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

// Validate booking data before sending the emails
function validateBookingData(bookingData) {
  if (
    !bookingData.client ||
    !bookingData.client.email ||
    !bookingData.client.name
  ) {
    throw new Error("Client information is missing.");
  }
  if (!bookingData.mentor || !bookingData.mentor.name || !bookingData.mentor.email) {
    throw new Error("Mentor information is missing.");
  }
  if (!bookingData.slot) {
    throw new Error("Booking slot information is missing.");
  }
}

// Function to send booking confirmation emails to both client and mentor
async function sendBookingConfirmationEmail(bookingData) {
  try {
    validateBookingData(bookingData);

    // Send email to client
    const { data: clientData, error: clientError } = await resend.emails.send({
      from: "no-reply@pretest.site",
      to: bookingData.client.email,
      subject: `1:1 Meeting Confirmed with ${bookingData.mentor.name}`,
      html: generateClientEmailContent(bookingData),
    });

    if (clientError) {
      throw new Error(`Failed to send email to client: ${clientError.message}`);
    }

    // Send email to mentor
    const { data: mentorData, error: mentorError } = await resend.emails.send({
      from: "no-reply@pretest.site",
      to: bookingData.mentor.email,
      subject: `1:1 Meeting Scheduled with ${bookingData.client.name}`,
      html: generateMentorEmailContent(bookingData),
    });

    if (mentorError) {
      throw new Error(`Failed to send email to mentor: ${mentorError.message}`);
    }

  } catch (error) {
    console.error("Error in sendBookingConfirmationEmail:", error.message);
  }
}

export { sendBookingConfirmationEmail };
