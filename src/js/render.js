import {refs} from '../index';

function renderItem(data) {
  const card = data.map(itm => {
    return `
          <div class='photo-card'>
          <a class='gallery__link' href='${itm.largeImageURL}'>
            <img src='${itm.webformatURL}' alt='${itm.tags}' loading='lazy'
            class='gallery__image' width='450' height='300'/>
          </a>
          <div class='info'>
          <p class='info-item'>
          <b>Likes:</b>
          ${itm.likes}
          </p>
          <p class='info-item'>
          <b>Views:</b>
          ${itm.views}
          </p>
          <p class='info-item'>
          <b>Comments:</b>
          ${itm.comments}
          </p>
          <p class='info-item'>
          <b>Downloads:</b>
          ${itm.downloads}
          </p>
          </div>
        </div>
`;
  }).join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', card);
}

export {renderItem}