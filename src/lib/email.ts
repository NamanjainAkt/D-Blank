import { Resend } from 'resend';

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

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
  whatsappGroupLink,
}: EnrollmentConfirmationProps) {
  const resend = getResendClient();
  
  if (!resend) {
    console.log('RESEND_API_KEY not configured. Skipping email send.');
    console.log('Email details:', { email, courseName, enrollmentId });
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'D-Blanks <onboarding@resend.dev>',
      to: email,
      subject: `Enrollment Confirmed: ${courseName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Enrollment Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 24px;">
                <div style="width: 8px; height: 8px; background-color: #10b981; border-radius: 50%;"></div>
                <span style="color: #ffffff; font-size: 20px; font-weight: bold;">D-Blanks</span>
              </div>
              <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0 0 16px 0;">
                Enrollment Confirmed! 🎉
              </h1>
              <p style="color: #888888; font-size: 16px; margin: 0;">
                Welcome to ${courseName}
              </p>
            </div>

            <!-- Main Card -->
            <div style="background-color: #111111; border: 1px solid #222222; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
              
              <!-- Greeting -->
              <p style="color: #ffffff; font-size: 18px; margin: 0 0 24px 0;">
                Hi ${studentName},
              </p>
              
              <p style="color: #888888; font-size: 14px; line-height: 1.6; margin: 0 0 32px 0;">
                Your enrollment has been confirmed. Here are your course details:
              </p>

              <!-- Enrollment ID -->
              <div style="background-color: #1a1a1a; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <p style="color: #666666; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">
                  Enrollment ID
                </p>
                <p style="color: #ffffff; font-size: 20px; font-family: monospace; font-weight: 500; margin: 0;">
                  ${enrollmentId}
                </p>
              </div>

              <!-- Course Details -->
              <div style="margin-bottom: 24px;">
                <h3 style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">Course Details</h3>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #666666; font-size: 14px;">Course</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #ffffff; font-size: 14px; text-align: right;">${courseName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #666666; font-size: 14px;">Duration</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #222222; color: #ffffff; font-size: 14px; text-align: right;">${duration}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #666666; font-size: 14px;">Schedule</td>
                    <td style="padding: 12px 0; color: #ffffff; font-size: 14px; text-align: right;">${schedule}</td>
                  </tr>
                </table>
              </div>

              <!-- Google Meet Button -->
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${meetLink}" style="display: inline-block; background-color: #10b981; color: #000000; text-decoration: none; font-size: 14px; font-weight: 600; padding: 14px 32px; border-radius: 8px;">
                  Join Google Meet Class
                </a>
              </div>

              <!-- WhatsApp Group -->
              ${whatsappGroupLink ? `
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${whatsappGroupLink}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 14px 32px; border-radius: 8px;">
                  Join WhatsApp Group
                </a>
              </div>
              ` : ''}

              <!-- Checklist -->
              <div style="background-color: #1a1a1a; border-radius: 12px; padding: 24px;">
                <h4 style="color: #ffffff; font-size: 14px; font-weight: 600; margin: 0 0 16px 0;">Next Steps</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                    <span style="flex-shrink: 0; width: 20px; height: 20px; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #10b981; font-size: 10px;">✓</span>
                    <span style="color: #888888; font-size: 14px;">Save your enrollment ID for future reference</span>
                  </li>
                  <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                    <span style="flex-shrink: 0; width: 20px; height: 20px; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #10b981; font-size: 10px;">✓</span>
                    <span style="color: #888888; font-size: 14px;">Join the WhatsApp group for updates</span>
                  </li>
                  <li style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                    <span style="flex-shrink: 0; width: 20px; height: 20px; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #10b981; font-size: 10px;">✓</span>
                    <span style="color: #888888; font-size: 14px;">Mark your calendar for the first session</span>
                  </li>
                  <li style="display: flex; align-items: flex-start; gap: 12px;">
                    <span style="flex-shrink: 0; width: 20px; height: 20px; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #10b981; font-size: 10px;">✓</span>
                    <span style="color: #888888; font-size: 14px;">Ensure you have a stable internet connection</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 24px;">
                <p style="color: #666666; font-size: 12px; margin: 0 0 8px 0;">
                  Need help? Contact us at <a href="mailto:arshgupta723@gmail.com" style="color: #3b82f6;">arshgupta723@gmail.com</a>
                </p>
              <p style="color: #444444; font-size: 12px; margin: 0;">
                © 2026 D-Blanks. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

interface PaymentConfirmationProps {
  studentName: string;
  email: string;
  courseName: string;
  amount: number;
  transactionId: string;
}

export async function sendPaymentConfirmation({
  studentName,
  email,
  courseName,
  amount,
  transactionId,
}: PaymentConfirmationProps) {
  const resend = getResendClient();
  
  if (!resend) {
    console.log('RESEND_API_KEY not configured. Skipping email send.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'D-Blanks <onboarding@resend.dev>',
      to: email,
      subject: `Payment Received: ₹${amount.toLocaleString()} - ${courseName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Payment Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 24px;">
                <div style="width: 8px; height: 8px; background-color: #10b981; border-radius: 50%;"></div>
                <span style="color: #ffffff; font-size: 20px; font-weight: bold;">D-Blanks</span>
              </div>
              <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0 0 16px 0;">Payment Received ✓</h1>
            </div>
            <div style="background-color: #111111; border: 1px solid #222222; border-radius: 16px; padding: 32px;">
              <p style="color: #ffffff; font-size: 18px; margin: 0 0 24px 0;">Hi ${studentName},</p>
              <p style="color: #888888; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                We have received your payment for <strong style="color: #ffffff;">${courseName}</strong>.
              </p>
              <div style="background-color: #1a1a1a; border-radius: 12px; padding: 24px; text-align: center;">
                <p style="color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">Amount Paid</p>
                <p style="color: #10b981; font-size: 32px; font-family: monospace; font-weight: 500; margin: 0;">₹${amount.toLocaleString()}</p>
                <p style="color: #666666; font-size: 12px; margin: 16px 0 0 0;">Transaction ID: ${transactionId}</p>
              </div>
            </div>
            <div style="text-align: center; padding-top: 24px;">
                <p style="color: #666666; font-size: 12px; margin: 0;">Questions? Contact <a href="mailto:arshgupta723@gmail.com" style="color: #3b82f6;">arshgupta723@gmail.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
