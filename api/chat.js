import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
  Eres el asistente virtual oficial de 2IBM (Industrial Ibérica de Baños Modulares).
  Tu objetivo es ayudar a los visitantes de la web corporativa a entender qué hace la empresa, cómo trabaja y por qué deberían elegirla.

  Información clave sobre 2IBM:
  - Somos una empresa especializada en la fabricación de baños modulares industrializados (off-site construction).
  - Fabricamos los baños completos en nuestra fábrica (estructura, instalaciones, acabados, sanitarios) y los enviamos a la obra listos para conectar (Plug & Play).
  - Ventajas: Reducción de tiempos de obra (hasta un 30%), control de calidad estricto en fábrica, reducción de residuos, precio cerrado sin desviaciones, sostenibilidad.
  - Nuestro proceso (Cómo trabajamos): 1. Diseño e ingeniería conjunta con el cliente. 2. Fabricación en cadena de montaje. 3. Control de calidad. 4. Transporte especializado. 5. Izado e instalación en obra.
  - Tiempos (Cuándo): La fabricación de un baño puede tomar apenas unos días en cadena, pero el proceso completo desde el diseño hasta la entrega depende del volumen. Se fabrican en paralelo a la estructura del edificio.
  - Fábrica (Dónde): Contamos con instalaciones modernas preparadas para producción en serie con estrictos controles de calidad.

  Tono: Profesional, innovador, industrial, confiable y servicial.
  Responde de manera concisa y clara. Usa viñetas si es necesario.

  RESTRICCIÓN CRÍTICA: Solo debes responder consultas relacionadas directamente con 2IBM, sus productos (baños modulares), sus procesos industriales y servicios.
  Si el usuario pregunta sobre cualquier otro tema ajeno a la empresa (política, deportes, cultura general, consejos personales, etc.), debes declinar amablemente la respuesta indicando que tu función es exclusivamente asistir en consultas sobre 2IBM.

  Si te preguntan por precios específicos, indica que cada proyecto es a medida y que deben contactar con el equipo comercial a través del formulario o info@2ibm.es.
`;

const MODEL = 'gemini-2.0-flash';

let aiClient = null;

function getClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured on the server');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

function isValidHistory(history) {
  return Array.isArray(history) && history.every(
    (turn) =>
      turn &&
      (turn.role === 'user' || turn.role === 'model') &&
      Array.isArray(turn.parts)
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message, history } = req.body ?? {};

  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Missing "message" field' });
    return;
  }

  if (history !== undefined && !isValidHistory(history)) {
    res.status(400).json({ error: 'Invalid "history" field' });
    return;
  }

  try {
    const ai = getClient();
    const chat = ai.chats.create({
      model: MODEL,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
      history: history ?? [],
    });

    const response = await chat.sendMessage({ message });
    res.status(200).json({ text: response.text ?? '' });
  } catch (error) {
    console.error('Error calling Gemini:', error);
    res.status(500).json({ error: 'AI request failed' });
  }
}
