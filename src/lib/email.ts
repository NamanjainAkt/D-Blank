import { Resend } from 'resend';

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM_EMAIL = 'D-Blanks <support@dblanks.site>';
const ADMIN_EMAIL = 'admin@dblanks.site';
const WHATSAPP_GROUP = 'https://chat.whatsapp.com/HPdK6rY0ykn4kov4Dlv2ki?mode=gi_t';

interface EnrollmentConfirmationProps {
  studentName: string;
  email: string;
  courseName: string;
  enrollmentId: string;
  duration: string;
  schedule: string;
  meetLink: string;
  whatsappGroupLink?: string;
}

export async function sendEnrollmentConfirmation({
  studentName,
  email,
  courseName,
  enrollmentId,
  duration,
  schedule,
  meetLink,
  whatsappGroupLink = WHATSAPP_GROUP,
}: EnrollmentConfirmationProps) {
  const resend = getResendClient();
  
  if (!resend) {
    console.log('RESEND_API_KEY not configured. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `CONGRATULATIONS: Your Enrollment is Confirmed! - ${courseName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Enrollment Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; border: 1px solid #1a1a1a; background: linear-gradient(180deg, #050505 0%, #000000 100%);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px; border-bottom: 1px solid #1a1a1a; padding-bottom: 30px;">
              <h1 style="color: #06b6d4; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; margin: 0;">
                D-BLANKS
              </h1>
              <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin-top: 10px;">
                // SECURE UPLINK ESTABLISHED
              </p>
            </div>

            <!-- Hero Section -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="font-size: 32px; font-weight: 900; margin: 0; text-transform: uppercase; font-style: italic; color: #ffffff;">
                CONGRATULATIONS
              </h2>
              <p style="color: #10b981; font-size: 16px; font-weight: bold; margin-top: 10px;">
                YOU ARE SUCCESSFULLY ENROLLED
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 0 20px;">
              <p style="font-size: 16px; line-height: 1.6; color: #ccc;">
                Hi <strong style="color: #fff;">${studentName}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #888; margin-bottom: 30px;">
                We have reviewed your request for <span style="color: #06b6d4; font-weight: bold;">${courseName}</span>. Your personnel file has been authorized and your module access is now active.
              </p>

              <!-- Stats Grid -->
              <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 25px; border-radius: 4px; margin-bottom: 40px;">
                <div style="margin-bottom: 20px; border-bottom: 1px solid #1a1a1a; padding-bottom: 15px;">
                  <span style="color: #444; font-size: 10px; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 5px;">Module Name</span>
                  <span style="font-size: 16px; font-weight: bold; color: #fff;">${courseName}</span>
                </div>
                <div style="margin-bottom: 20px; border-bottom: 1px solid #1a1a1a; padding-bottom: 15px;">
                  <span style="color: #444; font-size: 10px; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 5px;">Personnel ID</span>
                  <span style="font-size: 16px; font-family: monospace; color: #06b6d4;">#${enrollmentId}</span>
                </div>
                <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 20px;">
                   <div style="display: inline-block; width: 45%;">
                      <span style="color: #444; font-size: 10px; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 5px;">Duration</span>
                      <span style="font-size: 14px; color: #fff;">${duration}</span>
                   </div>
                   <div style="display: inline-block; width: 45%;">
                      <span style="color: #444; font-size: 10px; text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 5px;">Schedule</span>
                      <span style="font-size: 14px; color: #fff;">${schedule}</span>
                   </div>
                </div>
              </div>

              <!-- CTA Section -->
              <div style="text-align: center; margin-bottom: 40px;">
                <p style="color: #888; font-size: 13px; margin-bottom: 20px;">Please join the tactical communication group for further updates:</p>
                <a href="${whatsappGroupLink}" style="display: inline-block; background-color: #25D366; color: #fff; text-decoration: none; font-weight: 800; font-size: 14px; padding: 15px 40px; border-radius: 2px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);">
                  JOIN WHATSAPP GROUP
                </a>
              </div>

              <div style="text-align: center;">
                 <a href="${meetLink}" style="color: #06b6d4; font-size: 12px; font-weight: bold; text-decoration: none; border-bottom: 1px solid #06b6d4;">
                   Access Virtual Learning Environment (Meet)
                 </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
              <p style="color: #444; font-size: 11px; margin-bottom: 10px;">
                THIS IS AN AUTOMATED DISPATCH. DO NOT REPLY TO THIS UPLINK.
              </p>
              <p style="color: #666; font-size: 11px;">
                © 2026 D-BLANKS OPERATIONS. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message || 'Failed to send email' };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Email send error:', err);
    return { success: false, error: err.message || 'Internal server error' };
  }
}

export async function sendContactFormEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const resend = getResendClient();
  if (!resend) return { success: false, error: 'Email service not configured' };

  try {
    const { data, error } = await resend.emails.send({
      from: `D-Blanks Contact <contact@dblanks.site>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `NEW INQUIRY: ${subject}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif;">
          <h2 style="color: #06b6d4; border-bottom: 1px solid #333; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background: #111; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
       return { success: false, error: error.message || 'Failed to send contact email' };
    }
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || 'Internal error' };
  }
}

export async function sendPaymentConfirmation({
  studentName,
  email,
  courseName,
  amount,
  transactionId,
}: {
  studentName: string;
  email: string;
  courseName: string;
  amount: number;
  transactionId: string;
}) {
  const resend = getResendClient();
  if (!resend) return { success: false, error: 'Email service not configured' };

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `PAYMENT RECEIVED: ₹${amount.toLocaleString()} for ${courseName}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif; text-align: center;">
          <h1 style="color: #10b981; text-transform: uppercase;">Payment Verified ✓</h1>
          <p>Hi ${studentName}, we have received your payment for <strong>${courseName}</strong>.</p>
          <div style="background: #111; padding: 30px; border: 1px solid #222; margin: 20px auto; max-width: 400px;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase;">Amount Paid</p>
            <p style="font-size: 32px; color: #10b981; font-weight: bold; margin: 10px 0;">₹${amount.toLocaleString()}</p>
            <p style="color: #444; font-size: 11px;">Transaction ID: ${transactionId}</p>
          </div>
          <p style="color: #666; font-size: 12px;">Our team is reviewing your enrollment. You will receive a briefing email shortly.</p>
        </div>
      `,
    });

    if (error) {
       return { success: false, error: error.message || 'Failed to send payment confirmation' };
    }
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || 'Internal error' };
  }
}
