import { methodNotAllowed, sendJson } from '../_shared';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    methodNotAllowed(res, ['GET']);
    return;
  }

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    res.status(204).end();
    return;
  }

  try {
    const encodedCredentials = Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }).toString(),
    });

    if (!tokenResponse.ok) throw new Error(`token refresh failed: ${tokenResponse.status}`);

    const tokenData = (await tokenResponse.json()) as { access_token: string };
    const playerResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (playerResponse.status === 204 || !playerResponse.ok) {
      sendJson(res, 200, { isPlaying: false });
      return;
    }

    const playerData = (await playerResponse.json()) as any;
    if (!playerData.item) {
      sendJson(res, 200, { isPlaying: false });
      return;
    }

    sendJson(res, 200, {
      isPlaying: !!playerData.is_playing,
      title: playerData.item.name,
      artist: (playerData.item.artists || []).map((artist: any) => artist.name).join(', '),
      albumUrl: playerData.item.album?.images?.[0]?.url,
      trackUrl: playerData.item.external_urls?.spotify,
    });
  } catch {
    sendJson(res, 502, { error: 'Spotify upstream failed' });
  }
}
