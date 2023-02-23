import Api from './index';

export default new class ServiceApi {
  constructor() {
    this.api = new Api('https://api.unsplash.com/');
  }

  async getPhotos(page, count, options) {
    return await this.api.get({
      url: `/photos/?page=${page}&per_page=${count}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
      options
    });
  }

  async getPhotoById(id, options) {
    return await this.api.get({
      url: `/photos/${id}/?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
      options
    });
  }

  async downloadPhoto(link, params) {
    let paramStr;
    if (params) {
      paramStr = '&' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    }

    return await this.api.download({
      externalUrl: link + `?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}${paramStr}`
    });
  }
}
