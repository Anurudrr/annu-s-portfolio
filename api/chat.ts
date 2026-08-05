import { GoogleGenAI } from '@google/genai';
import {
  applyRateLimit,
  buildSystemPrompt,
  loadDb,
  methodNotAllowed,
  readBody,
  sanitizeOutput,
  sendJson,
} from './_shared';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    methodNotAllowed(res, ['POST']);
    return;
  }
  if (!applyRateLimit(req, res)) return;

  try {
    const { message, history } = await readBody(req);
    if (!message || typeof message !== 'string') {
      sendJson(res, 400, { error: 'Invalid message payload' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      sendJson(res, 200, {
        text:
          "I'm running in demo mode (no GEMINI_API_KEY configured). " +
          'Anurudh is a 3rd-year B.Tech CSE student at Parul University specializing in React, Java, and UI/UX design. ' +
          'Email: sanurudh938@gmail.com',
        demo: true,
      });
      return;
    }

    const safeHistory = Array.isArray(history)
      ? history
          .slice(-10)
          .filter(
            (item: any) =>
              item && typeof item.text === 'string' && ['user', 'model'].includes(item.role)
          )
          .map((item: any) => ({
            role: item.role,
            parts: [{ text: String(item.text).slice(0, 500) }],
          }))
      : [];

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'as-dev-portfolio' } },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [...safeHistory, { role: 'user', parts: [{ text: message.trim().slice(0, 500) }] }],
      config: { systemInstruction: buildSystemPrompt(loadDb()), temperature: 0.7 },
    });

    sendJson(res, 200, { text: sanitizeOutput(response.text || '') });
  } catch {
    sendJson(res, 500, { error: 'Something went wrong during generation.' });
  }
}
