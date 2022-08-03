import { getPhotos } from './js/pixabayapi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const buttonRef = document.querySelector('.button');
let page = 1;
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onFormSearch);
buttonRef.addEventListener('click', onButtonClick);

function makeImageMarkup({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  
    <div class="gallery__item">
    <a href="${largeImageURL}" class="gallery__link">
  <img src="${webformatURL}" alt="${tags}"  loading="lazy" class="gallery__image" height = "300" /></a>
  <ul class="gallery__info">
    <li class="info-item">
      <p><b>Likes</b>
      <p>${likes}
    </li>
    <li class="info-item">
      <p><b>Views</b>
      <p>${views}
    </li>
    <li class="info-item">
     <p> <b>Comments</b>
     <p> ${comments}
    </li>
    <li class="info-item">
     <p> <b>Downloads</b>
     <p> ${downloads}
    </li>
  </ul>
  
</div>

    `;
}

function onFormSearch(e) {
  e.preventDefault();
  if (form.searchQuery.value === '') {
    Notify.failure('You have to fill in search query!');
    return;
  }
  buttonRef.classList.remove('visible');
  page = 1;
  galleryRef.innerHTML = '';
  loadImages();
  buttonRef.classList.add('visible');
}

function onButtonClick(e) {
  e.preventDefault();
  loadImages();
}

function loadImages() {
  getPhotos(form.searchQuery.value, page).then(response => {
    console.log(response.hits);
    if (response.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      if (page === 1) {
        Notify.info(
          `Hooray! We found ${response.total} images, but you will see only ${response.totalHits} images )`
        );
      }
      addMarkup(response.hits);
      page += 1;
    }
  });
}

function makeGalleryMarkup(images) {
  return images.map(image => makeImageMarkup(image)).join('');
}

function addMarkup(galleryItems) {
  galleryRef.insertAdjacentHTML('beforeend', makeGalleryMarkup(galleryItems));
  lightbox.refresh();
}
