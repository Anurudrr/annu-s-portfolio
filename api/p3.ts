import { sendJson } from './_shared';
export default function handler(_req: any, res: any) {
  sendJson(res, 200, { relImport: 'ok' });
}
