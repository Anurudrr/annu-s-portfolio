import {
  applyRateLimit,
  loadDb,
  methodNotAllowed,
  readBody,
  sendJson,
  verifyPassword,
} from '../_shared';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    methodNotAllowed(res, ['POST']);
    return;
  }
  if (!applyRateLimit(req, res)) return;

  try {
    const { password } = await readBody(req);
    const passwordHash = loadDb().siteSettings?.galleryPasswordHash;

    if (!passwordHash || !password || !verifyPassword(password, passwordHash)) {
      sendJson(res, 401, { success: false, error: 'Invalid password' });
      return;
    }

    sendJson(res, 200, { success: true });
  } catch {
    sendJson(res, 500, { success: false, error: 'Authentication failed' });
  }
}
