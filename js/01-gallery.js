import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");

galleryList.addEventListener("click", onGalleryItemClick);

makeGalleryMarkup(galleryItems);

function makeGalleryMarkup(galleryItems) {
  const galleryMarkup = galleryItems
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
      `;
    })
    .join("");

  galleryList.insertAdjacentHTML("beforeend", galleryMarkup);
}

function onGalleryItemClick(event) {
  const { target } = event;
  event.preventDefault();

  if (!target.classList.contains("gallery__image")) {
    return;
  }

  const targetURL = target.dataset.source;
  const instance = basicLightbox.create(`<img src="${targetURL}">`);

  instance.show();

  const onEscapeKeyDown = (event) => {
    if (event.key === "Escape") {
      instance.close();
      document.removeEventListener("keydown");
    }
  };

  document.addEventListener("keydown", onEscapeKeyDown);
}
