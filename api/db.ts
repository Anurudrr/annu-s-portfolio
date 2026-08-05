import { loadDb, methodNotAllowed, sendJson } from './_shared';

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    methodNotAllowed(res, ['GET']);
    return;
  }

  try {
    sendJson(res, 200, loadDb());
  } catch {
    sendJson(res, 500, { error: 'Failed to load portfolio data' });
  }
}
