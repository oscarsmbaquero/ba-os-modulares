import { sendMail, escapeHtml } from './_lib/mailer.js';

const FIELDS = [
  ['nombre', 'Nombre'],
  ['empresa', 'Empresa'],
  ['email', 'Email'],
  ['mensaje', 'Mensaje'],
];

function isValidBody(body) {
  return (
    body &&
    typeof body.nombre === 'string' && body.nombre.trim().length > 0 && body.nombre.length < 200 &&
    typeof body.email === 'string' && body.email.trim().length > 0 && body.email.length < 200 &&
    typeof body.mensaje === 'string' && body.mensaje.trim().length > 0 && body.mensaje.length < 5000 &&
    (body.empresa === undefined || body.empresa === null || (typeof body.empresa === 'string' && body.empresa.length < 200))
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body ?? {};
  if (!isValidBody(body)) {
    res.status(400).json({ error: 'Invalid form data' });
    return;
  }

  const to = process.env.LEAD_EMAIL_TO;
  if (!to) {
    console.error('LEAD_EMAIL_TO no configurado; no se envía el email de contacto');
    res.status(500).json({ error: 'Email service not configured' });
    return;
  }

  const rows = FIELDS
    .filter(([key]) => body[key])
    .map(([key, label]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">${label}</td><td style="padding:4px 0">${escapeHtml(body[key])}</td></tr>`)
    .join('');

  try {
    const { sent } = await sendMail({
      to,
      replyTo: body.email,
      subject: `Nuevo mensaje de contacto — ${body.nombre}`,
      html: `<h2>Nuevo mensaje desde el formulario de contacto de 2IBM</h2><table>${rows}</table>`,
    });

    if (!sent) {
      res.status(500).json({ error: 'Email service not configured' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error enviando email de contacto:', error);
    res.status(500).json({ error: 'Email send failed' });
  }
}
