import fs from 'node:fs';
import path from 'node:path';
export default function handler(_req: any, res: any) {
  try {
    fs.readFileSync(path.join(process.cwd(), 'db.json'), 'utf8');
    res.status(200).json({ fs: 'works', read: 'ok' });
  } catch (e: any) {
    res.status(200).json({ fs: 'works', read: 'err:' + e.message });
  }
}
