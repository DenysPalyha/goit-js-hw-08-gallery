import gallerys from "./gallery-items.js";

const galleryEl = gallerys.reduce((acc, gallery) => {
  acc += `<li class="gallery__item"><a class="gallery__link" href="${gallery.preview}"><img class="gallery__image" src="${gallery.preview}" data-source="${gallery.original}" alt="${gallery.description}"></li>`;

  return acc;
}, "");

const galleryRef = document
  .querySelector(".js-gallery")
  .insertAdjacentHTML("beforeend", galleryEl);

const ref = {
  gallery: document.querySelector(".js-gallery"),
  modalRef: document.querySelector(".js-lightbox"),
  originalImage: document.querySelector(".lightbox__image"),
  closetModal: document.querySelector('[data-action="close-lightbox"]'),
};

ref.gallery.addEventListener("click", onGalleryClick);
ref.closetModal.addEventListener("click", onMadalGalleryCloset);
ref.modalRef.addEventListener("click", backDropCloset);

function onGalleryClick(event) {
  event.preventDefault();
  const even = event.target;
  if (even.nodeName !== "IMG") {
    return;
  }

  window.addEventListener("keydown", onPressEsc);
  ref.modalRef.classList.add("is-open");
  const modalImageRer = even.dataset.source;
  setLargeImage(modalImageRer);
}

function setLargeImage(url) {
  ref.originalImage.src = url;
}

function onMadalGalleryCloset() {
  window.removeEventListener("keydown", onPressEsc);
  ref.modalRef.classList.remove("is-open");
  ref.originalImage.src = "";
}
function backDropCloset(event) {
  if (event.target.offsetParent === event.currentTarget) {
    onMadalGalleryCloset();
  }
}

function onPressEsc(event) {
  if (event.code === "Escape") {
    onMadalGalleryCloset();
  }
}
