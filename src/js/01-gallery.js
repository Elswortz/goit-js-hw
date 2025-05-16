// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const galleryListRef = document.querySelector('.gallery');

const galleryMarkup = CreateGalleryMarkup(galleryItems);
galleryListRef.innerHTML = galleryMarkup;

function CreateGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}"/>
      </a>
    </li>
    `;
    })
    .join('');
}

var lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'top',
  captionDelay: 250,
});
// lightbox.open();
