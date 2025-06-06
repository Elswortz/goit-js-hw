export function renderImages({ data: { hits } }) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <div class="photo-card">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" loading="lazy" width="350px" height="350px" />
            </a>
            <div class="info">
              <p class="info-item">
                Likes: <b>${likes}</b>
              </p>
              <p class="info-item">
                Views: <b>${views}</b>
              </p>
              <p class="info-item">
                Comments: <b>${comments}</b>
              </p>
              <p class="info-item">
                Downloads: <b>${downloads}</b>
              </p>
            </div>
        </div>
      `;
      }
    )
    .join('');

  return markup;
}
