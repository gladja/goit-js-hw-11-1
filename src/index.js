import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

import { getContactService } from './js/api';
import { renderItem } from './js/render';
// import {scroll} from './js/scroll';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtm: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', searchQuery);
refs.loadMoreBtm.addEventListener('click', loadMore);

let search = '';
let page = 1;

let gallery = new SimpleLightbox('.gallery a', {
  fadeSpeed: 300,
  animationSpeed: 250,
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function searchQuery(event) {
  event.preventDefault();

  refs.galleryEl.innerHTML = '';
  page = 1;
  refs.loadMoreBtm.classList.add('is-hidden');

  // search = event.target.searchQuery.value;
  search = event.currentTarget.elements.searchQuery.value;
  if (search.trim() === '') {
    Notiflix.Notify.warning('Sorry, type search query. Please try again.');
    return;
  }

  getContactService(search, page).then(data => {
    if (data?.data?.totalHits > 0) {
      Notiflix.Notify.success(
        `Hooray! We found ${data.data.totalHits} images.`
      );
    }
    if (data?.data?.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.loadMoreBtm.classList.add('is-hidden');
    }
    // console.log(data.data);
    if (data?.data?.totalHits > 40) {
      refs.loadMoreBtm.classList.remove('is-hidden');
    }
    renderItem(data.data.hits);

    gallery.refresh();
    // scroll();
  }).catch(error => console.log(error))
}


function loadMore() {
  page += 1;
  refs.loadMoreBtm.classList.add('is-hidden');

  getContactService(search, page).then(data => {
    if (data.data.hits.length === 0) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtm.classList.add('is-hidden');
      return;
    }
    renderItem(data.data.hits);
    gallery.refresh();
    refs.loadMoreBtm.classList.remove('is-hidden');
    // scroll();
  });
}
