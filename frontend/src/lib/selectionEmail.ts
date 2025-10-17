import nodemailer from 'nodemailer';

export type SelectionEmailPayload = {
  teamName: string;
  teamCode: string;
  recipients: string[];
};

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


