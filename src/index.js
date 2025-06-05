import PixabayApiService from './js/api-service';
import { renderImages } from './js/render-images';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notiflix.Notify.init({
  position: 'center-top',
});

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');

const API = new PixabayApiService();
const simpleBoxGallery = createGalleryInstance();

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onBtnClick);

async function onFormSubmit(event) {
  try {
    event.preventDefault();
    loadMoreBtn.classList.add('hidden');

    const searchInputValue = event.currentTarget.elements.searchQuery.value;
    if (searchInputValue === '') {
      Notiflix.Notify.failure('The field is empty');
      return;
    }

    API.query = searchInputValue;
    API.resetPage();
    const images = await API.fetchImages();

    if (images.data.totalHits !== 0) {
      Notiflix.Notify.success(
        `Success! We found ${images.data.totalHits} images`
      );

      gallery.innerHTML = renderImages(images);
      simpleBoxGallery.refresh();
      loadMoreBtn.classList.remove('hidden');
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    Notiflix.Notify.failure(`${error.message}`);
  }
}

async function onBtnClick() {
  const images = await API.fetchImages();
  gallery.insertAdjacentHTML('beforeend', renderImages(images));
  simpleBoxGallery.refresh();
}

function createGalleryInstance() {
  return new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
  });
}
