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
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCallback(cardElement));
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCallback(likeButton));
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => zoomImage(cardElement));
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
