import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = `live_KTQhLGn5Bf5conehSP2WoCD89idQkFHCviZNt2YTmd5ZGF6nLKZV9sMeIXQ33urg`;
axios.defaults.headers.common['x-api-key'] = API_KEY;

export class CatsApiService {
  constructor() {}

  fetchBreeds() {
    return fetch(`${BASE_URL}/breeds`).then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      return response.json();
    });
  }

  fetchBreedById(breedId) {
    return fetch(`${BASE_URL}/breeds/${breedId}`).then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      return response.json();
    });
  }

  fetchCatImageByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`).then(
      response => {
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }
        return response.json();
      }
    );
  }
}
