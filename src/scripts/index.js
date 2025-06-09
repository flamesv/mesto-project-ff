import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";

const cardsContainer = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const addProfileButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.forms["new-place"];
const editProfileFormElement = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

export const imagePopupImg = document.querySelector(".popup__image");
export const imagePopupCaption = document.querySelector(".popup__caption");
export const imagePopup = document.querySelector(".popup_type_image");

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

editProfileButton.addEventListener("click", (e) => {
  editPopup.querySelector(".popup__input_type_name").value =
    document.querySelector(".profile__title").textContent;
  editPopup.querySelector(".popup__input_type_description").value =
    document.querySelector(".profile__description").textContent;
  openModal(editPopup);
});

addProfileButton.addEventListener("click", (e) => {
  openModal(addCardPopup);
});

function zoomImage(src, title) {
  imagePopupImg.src = src;
  imagePopupImg.alt = title;
  imagePopupCaption.textContent = title;
  openModal(imagePopup);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(editPopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = addCardForm.elements["place-name"].value;
  const cardLink = addCardForm.elements["link"].value;

  const newCard = createCard(
    { name: cardName, link: cardLink },
    deleteCard,
    likeCard,
    zoomImage
  );
  cardsContainer.prepend(newCard);

  closeModal(addCardPopup);
  addCardForm.reset();
}

editProfileFormElement.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardInfo) => {
  cardsContainer.append(createCard(cardInfo, deleteCard, likeCard, zoomImage));
});
