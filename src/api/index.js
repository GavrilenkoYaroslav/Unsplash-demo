import { download } from '../utils/download';

export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get({ url, externalUrl, options = {} }) {
    try {
      const _url = externalUrl ?? this.baseUrl + url;
      const response = await fetch(_url, {
        method: 'GET',
        ...options,
      });

      if (response.ok) {
        const data = await response.json();
        const headers = response.headers;
        return { data, headers };
      } else {
        throw new Error(`Failed to fetch ${_url}`);
      }
    } catch (e) {
      this.handleError(e);
      return { error: e.message };
    }
  }

  async download({ url, externalUrl, options = {} }) {
    try {
      const _url = externalUrl ?? this.baseUrl + url;
      const response = await fetch(_url, {
        method: 'GET',
        ...options,
      });

      if (response.ok) {
        const blob = await response.blob();
        await download(blob, 'image');
      } else {
        throw new Error(`Failed to fetch ${_url}`);
      }
    } catch (e) {
      this.handleError(e);
      return { error: e.message };
    }
  }

  handleError(e) {
    if (e.name === 'AbortError') return;
    console.error(e);
  }
}
