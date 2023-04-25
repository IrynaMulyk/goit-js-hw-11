import axios from 'axios';
import Notiflix from 'notiflix';
export default class ImagesApiService {
  constructor() {
    this.q = '';
    this.page = 1;
  }

  async fetchImages() {
    const options = new URLSearchParams({
      key: '35701892-d36a96061146ba0658239b01c',
      q: this.q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    });
    const url = `https://pixabay.com/api/`;
    if (this.query === '' || this.query === ' ') {
      Notiflix.Notify.info('Please fill out the field');
    } else {
      const data = await axios.get(`${url}?${options}&page=${this.page}`);
      const response = await data.data;
      this.incrementPage();
      return response;
    }
  }
  incrementPage() {
    this.page += 1;
  }
  get query() {
    return this.q;
  }
  set query(newQuery) {
    this.q = newQuery;
  }
}
