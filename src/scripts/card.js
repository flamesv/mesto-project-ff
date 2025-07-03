import { saveDeleteCard, saveLike } from "./api";

function deleteCard(card, cardId) {
  saveDeleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(`Ошибка запроса при удалении карточки: ${err}`);
    });
}

function likeCard(likeButton, likeCounter, cardId) {
  saveLike(cardId, likeButton.classList.contains("card__like-button_is-active"))
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(`Ошибка запроса при лайке карточки: ${err}`);
    });
}

function createCard(
  card,
  deleteCallback = deleteCard,
  likeCallback = likeCard,
  zoomImage = false,
  currentUserId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  if (zoomImage) {
    cardImage.addEventListener("click", (e) => zoomImage(card.link, card.name));
  }

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__like-counter").textContent =
    card.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (currentUserId != card.owner._id) {
    // console.log([card.name, currentUserId, card._id]);
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      deleteCallback(cardElement, card._id)
    );
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const isLiked = card.likes.some((item) => {
    return item._id === currentUserId;
  });
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    likeCallback(likeButton, likeCounter, card._id)
  );

  return cardElement;
}

export { createCard, deleteCard, likeCard };
