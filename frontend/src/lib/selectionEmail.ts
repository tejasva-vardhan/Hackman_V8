import nodemailer from 'nodemailer';

export type SelectionEmailPayload = {
  teamName: string;
  teamCode: string;
  recipients: string[];
};

export type PaymentVerificationEmailPayload = {
  teamName: string;
  teamCode: string;
  recipients: string[];
  whatsappLink: string;
};

export function buildPaymentVerificationEmailHtml(teamName: string, teamCode: string, whatsappLink: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; text-align: center; margin-bottom: 30px;">
        🎉 Payment Verified | HackmanV8
      </h2>

      <h3>Hello ${teamName}!</h3>

      <p>Congratulations! Your payment has been <strong>verified</strong> and you're officially confirmed for <strong><a href="https://hackman.dsce.in/">HackmanV8</a></strong>! 🎉</p>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #333;">Important Details:</h4>
        <p><strong>Team ID:</strong> <code>${teamCode}</code></p>
        <p><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">✅ CONFIRMED</span></p>
      </div>

      <h4>You're Coming to HackmanV8!</h4>
      <p>We're excited to have you join us for this amazing hackathon experience. Please join our WhatsApp community to stay updated with all the latest information, announcements, and connect with fellow participants.</p>

      <div style="background-color: #25D366; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
        <h4 style="margin-top: 0; color: white;">📱 Join Our WhatsApp Community</h4>
        <a href="${whatsappLink}" style="display: inline-block; background-color: white; color: #25D366; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; margin-top: 10px;">
          Join WhatsApp Group
        </a>
      </div>

      <h4>What's Next?</h4>
      <ul style="color: #333;">
        <li>Join the WhatsApp community for updates</li>
        <li>Prepare for the hackathon</li>
        <li>Check your dashboard for any additional requirements</li>
        <li>Get ready for an amazing 24-hour coding experience!</li>
      </ul>

      <p>If you have any questions, reply to this email or contact us through the WhatsApp group.</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

      <p style="font-size: 12px; color: #666; text-align: center;">
        HackmanV8<br>
        Questions? Contact us at ise.genesis.dsce@gmail.com
      </p>
    </div>
  `;
}

export async function sendPaymentVerificationEmail({ teamName, teamCode, recipients, whatsappLink }: PaymentVerificationEmailPayload): Promise<void> {
  if (!recipients || recipients.length === 0) return;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const subject = '🎉 Payment Verified - You\'re Coming to HackmanV8!';
  const html = buildPaymentVerificationEmailHtml(teamName, teamCode, whatsappLink);
  await Promise.all(
    recipients.map((to) =>
      transporter.sendMail({
        from: `Hackman V8 Team <${process.env.EMAIL_SERVER_USER}>`,
        to,
        subject,
        html,
      })
    )
  );
}

export function buildSelectionEmailHtml(teamName: string, teamCode: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; text-align: center; margin-bottom: 30px;">
        🎉 You're Selected | HackmanV8
      </h2>

      <h3>Hello ${teamName}!</h3>

      <p>Great news — your team has been <strong>selected</strong> for <strong><a href="https://hackman.dsce.in/">HackmanV8</a></strong>! 🎉</p>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #333;">Important Details:</h4>
        <p><strong>Team ID:</strong> <code>${teamCode}</code></p>
      </div>

      <h4>Next Steps:</h4>
      <p>Please proceed to the dashboard using the team lead's credentials and <strong>make the payment</strong> to confirm your spot.</p>

      <p>If you have any questions, reply to this email.</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

      <p style="font-size: 12px; color: #666; text-align: center;">
        HackmanV8<br>
        Questions? Contact us at ise.genesis.dsce@gmail.com
      </p>
    </div>
  `;
}

export async function sendSelectionEmail({ teamName, teamCode, recipients }: SelectionEmailPayload): Promise<void> {
  if (!recipients || recipients.length === 0) return;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const subject = '🎉 Congratulations! You\'re in!';
  const html = buildSelectionEmailHtml(teamName, teamCode);
  await Promise.all(
    recipients.map((to) =>
      transporter.sendMail({
        from: `Hackman V8 Team <${process.env.EMAIL_SERVER_USER}>`,
        to,
        subject,
        html,
      })
    )
  );
}


