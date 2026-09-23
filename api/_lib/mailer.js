import nodemailer from 'nodemailer';

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export async function sendMail({ to, subject, html, replyTo }) {
  const transport = getTransporter();
  if (!transport) {
    console.error('SMTP_USER o SMTP_PASS no configurados; no se envía el email');
    return { sent: false };
  }

  await transport.sendMail({
    from: `2IBM <${process.env.SMTP_USER}>`,
    to,
    replyTo,
    subject,
    html,
  });

  return { sent: true };
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
