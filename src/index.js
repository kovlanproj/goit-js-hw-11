import { getPhotos } from './js/pixabayapi';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

var lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onFormSearch);

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
  <img src="${webformatURL}" alt="${tags}"  loading="lazy" class="gallery__image" /></a>
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

  getPhotos(form.searchQuery.value, '1').then(images => {
    addMarkup(gallery, images);
  });

  console.log(lightbox);
}

function makeGalleryMarkup(images) {
  return images.map(image => makeImageMarkup(image)).join('');
}

function addMarkup(placeRefForMarkup, galleryItems) {
  placeRefForMarkup.insertAdjacentHTML(
    'beforeend',
    makeGalleryMarkup(galleryItems)
  );
  lightbox.refresh();
}
