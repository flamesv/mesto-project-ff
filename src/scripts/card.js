import { openModal } from "./modal";
import { imagePopupImg, imagePopupCaption, imagePopup } from "./index";

function deleteCard(card) {
  card.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function zoomImage(src, title) {
  imagePopupImg.src = src;
  imagePopupImg.alt = title;
  imagePopupCaption.textContent = title;
  openModal(imagePopup);
}

function createCard(
  card,
  deleteCallback = deleteCard,
  likeCallback = likeCard,
  zoomImage = zoomImage
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", (e) => zoomImage(card.link, card.name));

  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCallback(cardElement));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCallback(likeButton));

  return cardElement;
}

// @todo: Функция удаления карточки

export { createCard, deleteCard, likeCard, zoomImage };
