import PixabayApiService from './js/api-service';
import { renderImages } from './js/render-images';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notiflix.Notify.init({
  position: 'center-top',
});

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const taget = document.querySelector('.js-guard');

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onTargetScroll, options);
const API = new PixabayApiService();
const simpleBoxGallery = createGalleryInstance();

form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  try {
    event.preventDefault();

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
      observer.observe(taget);
      simpleBoxGallery.refresh();
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    Notiflix.Notify.failure(`${error.message}`);
  }
}

function onTargetScroll(entries, observer) {
  entries.forEach(async element => {
    try {
      if (element.isIntersecting) {
        const images = await API.fetchImages();
        gallery.insertAdjacentHTML('beforeend', renderImages(images));
        simpleBoxGallery.refresh();
        smoothScroll();

        const totalPages = Math.ceil(images.data.totalHits / 40);
        const currentPage = API.page - 1;

        if (currentPage >= totalPages) {
          Notiflix.Notify.info("You've reached the end of search results.");
          observer.unobserve(taget);
        }
      }
    } catch (error) {
      Notiflix.Notify.failure(`${error.message}`);
    }
  });
}

function createGalleryInstance() {
  return new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
  });
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
