import { loadDb, sendJson } from './_shared';
export default function handler(_req: any, res: any) {
  try {
    const db = loadDb();
    sendJson(res, 200, { ok: true, hasDb: !!db, keys: Object.keys(db) });
  } catch (err: any) {
    sendJson(res, 200, { ok: false, err: String(err?.message ?? err) });
  }
}
