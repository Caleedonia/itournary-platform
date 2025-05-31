// Placeholder for Email Service (SendGrid/Mailgun) API integration
// /api/email/send
import { NextRequest, NextResponse } from "next/server";

interface EmailPayload {
  to: string;
  from?: string; // Optional, can be set by default in the backend
  subject: string;
  text?: string;
  html?: string;
  templateId?: string; // For services like SendGrid that use templates
  dynamicTemplateData?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as EmailPayload;
    const { to, from = "noreply@paradisepartners.example.com", subject, text, html, templateId, dynamicTemplateData } = body;

    if (!to || !subject || (!text && !html && !templateId)) {
      return NextResponse.json({ error: "Missing required email fields (to, subject, and text/html/templateId)" }, { status: 400 });
    }

    console.log(`Email Service API call (mock): Sending email to ${to}`);
    console.log(`Subject: ${subject}`);
    if (templateId) {
      console.log(`Using template: ${templateId} with data:`, dynamicTemplateData);
    } else if (html) {
      console.log("Sending HTML email.");
    } else {
      console.log("Sending plain text email.");
    }

    // In a real scenario, you would use the SDK for SendGrid, Mailgun, etc.
    // Example (conceptual):
    // if (process.env.EMAIL_PROVIDER === "sendgrid") {
    //   const sgMail = require("@sendgrid/mail");
    //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //   const msg = { to, from, subject, text, html, templateId, dynamicTemplateData };
    //   await sgMail.send(msg);
    // } else if (process.env.EMAIL_PROVIDER === "mailgun") { ... }

    return NextResponse.json({ message: "Email sent successfully (mock)", emailId: `mock_email_${Date.now()}` });
  } catch (error) {
    console.error("Email Service API (mock) error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

