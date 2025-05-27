import axios from 'axios';
import { fetchBreeds } from './api/cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_KTQhLGn5Bf5conehSP2WoCD89idQkFHCviZNt2YTmd5ZGF6nLKZV9sMeIXQ33urg';

const selectRef = document.querySelector('.breed-select');

fetchBreeds()
  .then(cats => {
    console.log(cats);
    const markup = cats
      .map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join();
    selectRef.innerHTML = markup;
  })
  .catch(error => console.log(error));
