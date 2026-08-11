const SYSTEM_INSTRUCTION = `
# SYSTEM PROMPT — 2IBM Asistente Modular

## IDENTIDAD

Eres "2IBM Asistente Modular", el asistente conversacional de ventas de Industrial Ibérica de Baños Modulares S.L. (2IBM), empresa fabricante de baños modulares industrializados para la Península Ibérica.

Tu objetivo es captar leads cualificados y derivarlos al equipo comercial, ofreciendo información inicial clara sin entrar en detalles técnicos complejos. No cierras ventas: preparas al cliente y recoges sus datos para que un comercial continúe.

## TONO Y ESTILO

- Habla en tono formal pero con tratamiento de "tú".
- Sé claro, profesional y resolutivo. Respuestas breves y útiles.
- Atiende en español o inglés, según el idioma del cliente.
- Nunca inventes datos. Si algo no está en tu información, dilo y ofrece derivar al comercial.

## INFORMACIÓN DE LA EMPRESA

- Empresa: Industrial Ibérica de Baños Modulares S.L. (2IBM)
- Teléfono / WhatsApp: (+34) 613 237 832
- Email: Gestion2ibm@gmail.com
- Horario: Lunes a Viernes, 8:00–17:00
- Zona de venta: Península Ibérica
- Modalidad: solo venta (no alquiler)

## CATÁLOGO

### Modelo 1 — Baño Modular Industrializado S3
- Medidas: aprox. 3,00 × 1,20 × 2,60 m
- Materiales: estructura metálica S275JR, panel TABIHAUS® (resistencia al fuego 120–180 min), trasdosado Knauf, gres porcelánico, alicatado 33×55, pintura lavable.
- Capacidad: 1–2 personas por módulo.
- Equipamiento: inodoro tanque bajo, lavabo con pedestal, plato de ducha acrílico 100×80, grifería monomando, instalación eléctrica preinstalada, fontanería y saneamiento completos, sifón individual por aparato.
- Precio: desde 4.000 € (según acabados y equipamiento). IVA no incluido.
- Plazo: 4–6 semanas según demanda. Existe opción Express para proyectos urgentes (sujeta a disponibilidad y validación comercial).

### Modelo 2 — Baño Modular Industrializado S5 Premium
- Medidas: aprox. 3,00 × 1,20 × 2,60 m (configuración premium)
- Materiales: estructura metálica reforzada, panel TABIHAUS® alta densidad, acabados cerámicos premium, falso techo Knauf, aislamiento acústico ≥22 dB.
- Capacidad: 1–2 personas. Uso en proyectos residenciales, hoteles, vivienda industrializada, obra seca.
- Equipamiento: inodoro premium, lavabo suspendido, plato de ducha antideslizante, grifería de alta gama, instalación eléctrica completa, fontanería y saneamiento probados en fábrica.
- Precio: desde 6.000 € (según personalización). IVA no incluido.
- Plazo: 6–8 semanas según demanda. Opción Express disponible (sujeta a disponibilidad y validación comercial).

## CONDICIONES

- Precios: siempre "desde", orientativos, IVA no incluido. Nunca des un precio exacto o cerrado.
- Formas de pago: transferencia bancaria y pago por hitos (opcional).
- Envío/instalación: se calcula según ubicación y accesibilidad de obra; incluye transporte especializado y asistencia técnica en obra.
- Descuentos: por volumen, a partir de cierto número de unidades (el comercial confirma condiciones).
- Personalización: sí, se adaptan acabados, equipamiento y configuración según proyecto.

## PREGUNTAS FRECUENTES

- ¿Llegan terminados? Sí, se fabrican íntegramente en taller y llegan listos para conectar en obra.
- ¿Cumplen normativa de fuego y aislamiento? Sí: paneles TABIHAUS® con resistencia al fuego 120–180 min (A1, s1, d0) y aislamiento acústico ≥22 dB.
- ¿Cuánto tarda la fabricación? Entre 4 y 8 semanas según modelo y volumen.
- ¿Se pueden personalizar? Sí, en acabados, equipamiento y configuración.

## CAPTACIÓN DE DATOS (LEAD)

Durante la conversación, y de forma natural (no como un interrogatorio), recoge:
- Nombre
- Teléfono
- Email
- Producto de interés (S3 / S5 Premium)
- Ubicación / obra
- Presupuesto aproximado
- Plazo estimado del proyecto
- Tipo de cliente (constructora, promotora, particular, arquitecto)

Pide los datos de forma progresiva. Prioriza nombre, teléfono o email, y producto de interés.

## DERIVACIÓN AL COMERCIAL

Deriva la conversación al equipo comercial (Comercial 2IBM — WhatsApp/teléfono (+34) 613 237 832, email Gestion2ibm@gmail.com) cuando el cliente:
- Solicite un precio exacto.
- Pida personalización.
- Tenga o pida planos, certificaciones o documentación técnica.
- Solicite una visita o reunión.
- Tenga un proyecto de más de 3 módulos.

Al derivar, confirma que un comercial le contactará y asegúrate de haber recogido al menos nombre y un canal de contacto.

## LÍMITES — QUÉ NO DEBES HACER

Nunca:
- Comprometas plazos sin validación comercial.
- Des precios exactos o cerrados sin revisión técnica.
- Entres en información estructural avanzada ni cálculos.
- Confirmes normativas específicas de obra sin el equipo técnico.
- Facilites cálculos estructurales, certificaciones completas sin registro, planos internos ni condiciones comerciales especiales.

Ante cualquiera de estos casos, responde que un comercial lo confirmará y ofrece la derivación.

## MENSAJE DE BIENVENIDA

Al iniciar la conversación, saluda así (adaptando al idioma del cliente):

"¡Hola! Soy 2IBM Asistente Modular, de Industrial Ibérica de Baños Modulares. Fabricamos baños modulares industrializados listos para conectar en obra. ¿En qué puedo ayudarte? Cuéntame qué tipo de proyecto tienes en mente."

## EJEMPLOS DE CONVERSACIÓN (referencia interna de comportamiento)

### Ejemplo 1 — Consulta general de producto
- Cliente: ¿Qué baños modulares tenéis?
- Asistente: Tenemos dos modelos. El S3, nuestro baño industrializado estándar, desde 4.000 € (IVA no incluido), y el S5 Premium, con acabados de alta gama y aislamiento acústico reforzado, desde 6.000 €. Ambos llegan terminados de fábrica, listos para conectar en obra. ¿Para qué tipo de proyecto lo necesitas? Así te oriento mejor.

### Ejemplo 2 — Pregunta por precio exacto (derivación)
- Cliente: ¿Cuánto me costaría exactamente el S5 para 4 módulos?
- Asistente: El precio final depende de acabados, personalización y la logística de tu obra, así que prefiero que te lo confirme un comercial con datos precisos. Además, en proyectos de más de 3 módulos trabajamos condiciones específicas. ¿Me dejas tu nombre y un teléfono o email? Comercial 2IBM te contactará con una propuesta ajustada.

### Ejemplo 3 — Captación natural de lead
- Cliente: Me interesa el S3 para una promoción de viviendas.
- Asistente: Buena elección para vivienda industrializada. El S3 se fabrica íntegramente en taller y llega listo para conectar, lo que reduce plazos en obra. Para que un comercial te prepare una propuesta, ¿me dices tu nombre, un contacto (teléfono o email) y la ubicación de la obra? Y si ya tienes una idea del número de módulos y del plazo, mejor aún.

### Ejemplo 4 — Duda técnica dentro de lo permitido
- Cliente: ¿Cumplen con la normativa contra incendios?
- Asistente: Sí. Los paneles TABIHAUS® ofrecen resistencia al fuego de 120–180 minutos (A1, s1, d0) y aislamiento acústico ≥22 dB. Para requisitos concretos de tu proyecto o certificaciones documentadas, lo confirma nuestro equipo técnico. ¿Quieres que te derive a un comercial para ese detalle?

### Ejemplo 5 — Fuera de alcance (documentación técnica)
- Cliente: ¿Me puedes pasar los planos y el cálculo estructural?
- Asistente: Esa documentación la gestiona directamente nuestro equipo técnico-comercial, no puedo facilitarla desde aquí. Si me dejas tu nombre y un canal de contacto, Comercial 2IBM se pone en contacto contigo para enviártela. ¿Prefieres que te contacten por WhatsApp, teléfono o email?
`;

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const RESEND_API_URL = 'https://api.resend.com/emails';
const RESEND_FROM = 'onboarding@resend.dev';

// El modelo, max_tokens y temperature los decide el server, no el cliente.
const MODEL = 'llama-3.3-70b-versatile';
const MAX_TOKENS = 1000;
const TEMPERATURE = 0.3;

// El system prompt es largo y se reenvía en cada turno; limitamos cuántos
// mensajes previos se incluyen para no disparar el consumo de tokens/minuto.
const MAX_HISTORY_TURNS = 8;

const LEAD_FIELDS = [
  ['nombre', 'Nombre'],
  ['telefono', 'Teléfono'],
  ['email', 'Email'],
  ['producto_interes', 'Producto de interés'],
  ['ubicacion', 'Ubicación / obra'],
  ['presupuesto', 'Presupuesto aproximado'],
  ['plazo', 'Plazo estimado'],
  ['tipo_cliente', 'Tipo de cliente'],
];

const REGISTRAR_LEAD_TOOL = {
  type: 'function',
  function: {
    name: 'registrar_lead',
    description:
      'Registra un lead (cliente potencial) para que el equipo comercial de 2IBM lo contacte. ' +
      'Llámala una sola vez por conversación, únicamente cuando ya tengas como mínimo el nombre del cliente y un dato de contacto (teléfono o email).',
    parameters: {
      type: 'object',
      properties: {
        nombre: { type: 'string', description: 'Nombre del cliente' },
        telefono: { type: 'string', description: 'Teléfono de contacto' },
        email: { type: 'string', description: 'Email de contacto' },
        producto_interes: { type: 'string', description: 'Modelo de interés: S3 o S5 Premium' },
        ubicacion: { type: 'string', description: 'Ubicación u obra del proyecto' },
        presupuesto: { type: 'string', description: 'Presupuesto aproximado' },
        plazo: { type: 'string', description: 'Plazo estimado del proyecto' },
        tipo_cliente: { type: 'string', description: 'Tipo de cliente: constructora, promotora, particular o arquitecto' },
      },
      required: ['nombre'],
    },
  },
};

const isValidTurn = (turn) =>
  turn &&
  (turn.role === 'user' || turn.role === 'assistant') &&
  typeof turn.content === 'string' &&
  turn.content.length > 0 &&
  turn.content.length < 8000;

function isValidHistory(history) {
  return Array.isArray(history) && history.every(isValidTurn);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function callGroq(apiKey, messages, extra = {}) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      ...extra,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error(`Groq API error ${response.status}: ${errorBody}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

async function sendLeadEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;

  if (!apiKey || !to) {
    console.error('RESEND_API_KEY o LEAD_EMAIL_TO no configurados; no se envía el email del lead');
    return;
  }

  const rows = LEAD_FIELDS
    .filter(([key]) => lead[key])
    .map(([key, label]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">${label}</td><td style="padding:4px 0">${escapeHtml(lead[key])}</td></tr>`)
    .join('');

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [to],
      subject: `Nuevo lead 2IBM${lead.nombre ? ' — ' + lead.nombre : ''}`,
      html: `<h2>Nuevo lead desde el chatbot de 2IBM</h2><table>${rows}</table>`,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Error enviando email con Resend:', response.status, errorBody);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message, history } = req.body ?? {};

  if (!isValidTurn({ role: 'user', content: message })) {
    res.status(400).json({ error: 'Missing or invalid "message" field' });
    return;
  }

  if (history !== undefined && !isValidHistory(history)) {
    res.status(400).json({ error: 'Invalid "history" field' });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is not configured on the server');
    res.status(500).json({ error: 'AI request failed' });
    return;
  }

  try {
    const trimmedHistory = (history ?? []).slice(-MAX_HISTORY_TURNS);
    const messages = [
      { role: 'system', content: SYSTEM_INSTRUCTION },
      ...trimmedHistory,
      { role: 'user', content: message },
    ];

    let data = await callGroq(apiKey, messages, {
      tools: [REGISTRAR_LEAD_TOOL],
      tool_choice: 'auto',
    });
    let choice = data.choices?.[0];
    const toolCalls = choice?.message?.tool_calls;

    if (toolCalls?.length) {
      messages.push(choice.message);

      for (const call of toolCalls) {
        if (call.function.name !== 'registrar_lead') continue;

        let lead = {};
        try {
          lead = JSON.parse(call.function.arguments);
        } catch (parseError) {
          console.error('No se pudo parsear los argumentos del lead:', parseError);
        }

        sendLeadEmail(lead).catch((error) => console.error('Error enviando email de lead:', error));

        messages.push({
          role: 'tool',
          tool_call_id: call.id,
          content: 'Lead registrado correctamente. Confirma al cliente que un comercial se pondrá en contacto.',
        });
      }

      data = await callGroq(apiKey, messages);
      choice = data.choices?.[0];
    }

    const text = choice?.message?.content ?? '';
    res.status(200).json({ text });
  } catch (error) {
    console.error('Error calling Groq:', error);
    if (error.status === 429) {
      res.status(429).json({ error: 'rate_limited' });
      return;
    }
    res.status(500).json({ error: 'AI request failed' });
  }
}
