import './css/styles.css';
import Notiflix from 'notiflix';
import ImagesApiService from './js/api';

const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();
form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(e) {
  e.preventDefault();
  clearMarkup();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
  imagesApiService.resetPage();
  try {
    const result = await imagesApiService.fetchImages();
    if (result.total === 0) {
      clearMarkup();
      loadMoreBtn.classList.add('load-more');
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    appendGalleryMarkup(result);
  } catch (error) {
    return error;
  }
}

function createGallery(data) {
  return data.hits.reduce((acc, item) => {
    return (
      acc +
      `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b> <span>${item.likes}</span>
    </p>
    <p class="info-item">
      <b>Views:</b> <span>${item.views}</span>
    </p>
    <p class="info-item">
      <b>Comments:</b> <span>${item.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads:</b> <span>${item.downloads}</span>
    </p>
  </div>
</div>`
    );
  }, '');
}
function appendGalleryMarkup(data) {
  gallery.insertAdjacentHTML('beforeend', createGallery(data));
  loadMoreBtn.classList.remove('load-more');
}
function clearMarkup() {
  gallery.innerHTML = '';
}

function onLoadMore() {
  imagesApiService.fetchImages().then(result => {
    const galleryLength = document.querySelectorAll('.photo-card');
    if (result.totalHits === galleryLength.length) {
      return Notiflix.Notify.info(
        'We are sorry, but you  have reached the end of search results.'
      );
    }
    appendGalleryMarkup(result);
  });
}
