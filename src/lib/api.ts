import type { ProjectItem, BlogItem, HobbyItem, SiteSettings, DBShape } from '../types';

const API_BASE = '/api';

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || `HTTP ${response.status}`);
  }
  return response.json();
}

export const api = {
  async getDb(): Promise<DBShape> {
    const response = await fetch(`${API_BASE}/db`);
    return handleResponse<DBShape>(response);
  },

  async getProjects(): Promise<ProjectItem[]> {
    const db = await this.getDb();
    return db.projects || [];
  },

  async getBlog(): Promise<BlogItem[]> {
    const db = await this.getDb();
    return db.blog || [];
  },

  async getHobbies(): Promise<HobbyItem[]> {
    const db = await this.getDb();
    return db.hobbies || [];
  },

  async getSettings(): Promise<SiteSettings | undefined> {
    const db = await this.getDb();
    return db.siteSettings;
  },

  async chat(message: string, history: { role: 'user' | 'model'; text: string }[] = []) {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    return handleResponse<{ text: string; demo?: boolean }>(response);
  },

  async getSpotify() {
    const response = await fetch(`${API_BASE}/spotify/currently-playing`);
    if (response.status === 204) return null;
    return handleResponse<{
      isPlaying: boolean;
      title: string;
      artist: string;
      albumUrl: string;
      trackUrl: string;
    }>(response);
  },

  async subscribeNewsletter(email: string) {
    const response = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return handleResponse<{ ok: boolean; alreadySubscribed?: boolean }>(response);
  },
};

export { ApiError };
