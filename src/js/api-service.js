import axios from 'axios';

const AUTH_TOKEN = '50700710-80ba1f31df9b10c9037cb401f';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages(search) {
    const response = await axios('https://pixabay.com/api', {
      params: {
        key: AUTH_TOKEN,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
      },
    });
    this.incrementPage();
    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
