import { CatsApiService } from './api/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const API = new CatsApiService();
const selectRef = document.querySelector('.breed-select');
const infoBlockRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

errorRef.hidden = true;

renderSelectOptions();
selectRef.addEventListener('change', onSelectChange);

function onSelectChange(event) {
  errorRef.hidden = true;
  showLoader();
  const catId = event.currentTarget.value;

  infoBlockRef.innerHTML = '';

  Promise.all([API.fetchCatImageByBreed(catId), API.fetchBreedById(catId)])
    .then(([catImage, catInfo]) => {
      hideLoader();
      renderCatImage(catImage[0].url);
      renderCatInfo(catInfo);
    })
    .catch(error => {
      hideLoader();
      errorRef.hidden = false;
      Notiflix.Notify.failure(`${error}`);
    });
}

function renderSelectOptions() {
  showLoader();
  selectRef.hidden = true;
  API.fetchBreeds()
    .then(cats => {
      const optionsMarkup = cats.map(
        ({ id, name }) => `<option value="${id}">${name}</option>`
      );
      selectRef.insertAdjacentHTML('beforeend', optionsMarkup.join(''));

      var select = new SlimSelect({
        select: '#slimselect',
      });

      selectRef.hidden = false;
      hideLoader();
    })
    .catch(error => {
      Notiflix.Notify.failure(`${error}`);
    });
}

function renderCatImage(url) {
  const markup = `<div class="img-block"><img src="${url}" alt="Cat"></div>`;
  infoBlockRef.insertAdjacentHTML('beforeend', markup);
}

function renderCatInfo({ name, description, temperament }) {
  const markup = `
  <div class="info-block">
  <h2 class="Cat__Title">${name}</h2>
  <p class="Cat__Description">${description}</p>
  <p class="Cat__Temperamnet">${temperament}</p>
  </div>
  `;
  infoBlockRef.insertAdjacentHTML('beforeend', markup);
}

function showLoader() {
  loaderRef.classList.add('is-visible');
}

function hideLoader() {
  loaderRef.classList.remove('is-visible');
}
