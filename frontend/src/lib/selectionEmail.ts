import nodemailer from 'nodemailer';

export type SelectionEmailPayload = {
  teamName: string;
  teamCode: string;
  recipients: string[];
};

export function buildSelectionEmailHtml(teamName: string, teamCode: string): string {
  return `
    <div style="margin:0;padding:0;background:#f6f7f9;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08);font-family:Arial,Helvetica,sans-serif;color:#111;">
        <tr>
          <td style="padding:24px 24px 8px 24px;background:linear-gradient(135deg,#ff6700,#ff2d55);color:#fff;">
            <h1 style="margin:0;font-size:22px;line-height:1.3;">Congratulations ${teamName}, you're in!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px 0 24px;">
            <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;">Hey ${teamName}, great news — <strong>you're selected</strong> for Hackman V8! 🎉</p>
            <div style="margin:16px 0;padding:14px 16px;background:#0f172a;color:#e2e8f0;border:1px solid #334155;border-radius:8px;">
              <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#93c5fd;margin-bottom:6px;">Your Team ID</div>
              <div style="font-size:18px;font-weight:700;letter-spacing:.04em;">${teamCode}</div>
            </div>
            <p style="margin:0 0 10px 0;font-size:15px;line-height:1.6;"><strong>Next Step:</strong> Please proceed to the dashboard using the team lead's credentials and make the payment to confirm your spot.</p>
            <p style="margin:0 0 16px 0;font-size:14px;color:#444;">If you have any questions, reply to this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 24px 24px 24px;">
            <hr style="border:none;height:1px;background:#e5e7eb;margin:16px 0;" />
            <p style="margin:0 0 6px 0;font-size:13px;line-height:1.6;color:#555;">Thank you for registering for <strong>Hackman V8</strong>. We look forward to seeing you there!</p>
            <p style="margin:0;font-size:13px;line-height:1.6;color:#555;">— Hackman Organizers</p>
          </td>
        </tr>
      </table>
      <div style="text-align:center;color:#94a3b8;font-size:11px;margin-top:12px;">This is an automated message. Please do not share your Team ID.</div>
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
  const subject = '🎉 Congratulations! Your Team Has Been Selected';
  const html = buildSelectionEmailHtml(teamName, teamCode);
  await Promise.all(
    recipients.map((to) =>
      transporter.sendMail({
        from: `Hackman Team <${process.env.EMAIL_SERVER_USER}>`,
        to,
        subject,
        html,
      })
    )
  );
}


