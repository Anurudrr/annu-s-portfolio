import fs from 'node:fs';
import path from 'node:path';
import { readBody, sendJson, methodNotAllowed, applyRateLimit } from './_shared';

const DB_PATH = path.join(process.cwd(), 'db.json');

interface NewsletterEntry {
  email: string;
  subscribedAt: string;
  source: string;
}

interface NewslettersDb {
  newsletters?: NewsletterEntry[];
}

function loadDb(): NewslettersDb {
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw) as NewslettersDb;
}

function saveDb(db: NewslettersDb): void {
  const tmpPath = `${DB_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(db, null, 2));
  fs.renameSync(tmpPath, DB_PATH);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    methodNotAllowed(res, ['POST']);
    return;
  }

  if (!applyRateLimit(req, res)) return;

  try {
    const body = await readBody(req);

    // Honeypot: bots fill hidden fields — silently pretend success.
    if (body.website && typeof body.website === 'string' && body.website.length > 0) {
      sendJson(res, 200, { ok: true });
      return;
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!EMAIL_RE.test(email)) {
      sendJson(res, 400, { error: 'A valid email address is required' });
      return;
    }
    if (email.length > 254) {
      sendJson(res, 400, { error: 'Email address is too long' });
      return;
    }

    const db = loadDb();
    const newsletters = db.newsletters ?? [];
    if (newsletters.some((entry) => entry.email === email)) {
      sendJson(res, 200, { ok: true, alreadySubscribed: true });
      return;
    }

    const entry: NewsletterEntry = {
      email,
      subscribedAt: new Date().toISOString(),
      source: 'blog',
    };
    newsletters.push(entry);
    db.newsletters = newsletters;
    saveDb(db);

    sendJson(res, 200, { ok: true });
  } catch (err) {
    console.error('[newsletter] error:', (err as Error).message);
    sendJson(res, 500, { error: 'Could not save subscription' });
  }
}
