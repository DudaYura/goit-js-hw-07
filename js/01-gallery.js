import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryRef = document.querySelector('.gallery');
const galleryMarkupRef = createGalleryMarkup(galleryItems);

galleryRef.innerHTML = galleryMarkupRef;
galleryRef.addEventListener('click', onGalleryItemClick);

function createGalleryMarkup(item) {
  return item
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
    />
    </a>
    </div>`
    )
    .join('');
}

function onGalleryItemClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') return;

  const originalUrl = getOriginalUrl(evt.target);

  openOriginalImg(originalUrl);
}

function getOriginalUrl(element) {
  return element.dataset.source;
}

function openOriginalImg(originalUrl) {
  const originalImg = basicLightbox.create(`<img src="${originalUrl}">`, {
    onShow: () => document.addEventListener('keydown', modalCloseWithEsc),
    onClose: () => document.removeEventListener('keydown', modalCloseWithEsc),
  });
  originalImg.show();
  document.openedModal = originalImg;
}

function modalCloseWithEsc(evt) {
  if (evt.code === 'Escape') {
    document.openedModal.close();
    delete document.openedModal;
  }
}
console.log(galleryItems);
