import "../src/pages/index.css";
import {
  getMe,
  getCards,
  saveCard,
  updateAvatar,
  updateProfile,
} from "./scripts/api.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";

const cardsContainer = document.querySelector(".places__list");
const editAvatarButton = document.querySelector(".profile__image");
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const saveAvatarButton = editAvatarPopup.querySelector(".popup__button");
const avatarForm = document.forms["update-avatar"];
const avatarUrl = editAvatarPopup.querySelector(".popup__input_type_url");

const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const addProfileButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardPopupButton = addCardPopup.querySelector(".popup__button");
const addCardForm = document.forms["new-place"];
const editProfileFormElement = document.forms["edit-profile"];
const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");
const imagePopupImg = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");
const imagePopup = document.querySelector(".popup_type_image");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

let userInfo = {};

const validationConfig = {
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__form-fieldset",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// редактирование аватара
editAvatarButton.addEventListener("click", (e) => {
  clearValidation(editAvatarPopup, validationConfig);
  openModal(editAvatarPopup);
});

function updateAvatarInHtml(element, link) {
  element.style.backgroundImage = `url('${link}')`;
}

function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  preloader(saveAvatarButton, true);
  let avatarLink = avatarUrl.value;
  updateAvatar(avatarLink)
    .then((res) => {
      updateAvatarInHtml(editAvatarButton, avatarLink);
      closeModal(editAvatarPopup);
      avatarForm.reset();
    })
    .catch((err) => console.log("handleUpdateAvatarSubmit: ", err))
    .finally(() => {
      preloader(saveAvatarButton, false);
    });
}
avatarForm.addEventListener("submit", handleUpdateAvatarSubmit);

// редактирование профиля
editProfileButton.addEventListener("click", (e) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(editPopup, validationConfig);

  openModal(editPopup);
});

//модалка профиля
addProfileButton.addEventListener("click", (e) => {
  clearValidation(addCardPopup, validationConfig);
  openModal(addCardPopup);
});

function zoomImage(src, title) {
  imagePopupImg.src = src;
  imagePopupImg.alt = title;
  imagePopupCaption.textContent = title;
  openModal(imagePopup);
}

function updateProfileInHtml(name, desc) {
  profileName.textContent = name;
  profileDescription.textContent = desc;
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  updateProfile(nameInput.value, jobInput.value)
    .then(() => {
      updateProfileInHtml(nameInput.value, jobInput.value);
      closeModal(editPopup);
    })
    .catch(console.error);
}

function preloader(button, inProgress) {
  if (inProgress) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = addCardForm.elements["place-name"].value;
  const cardLink = addCardForm.elements["link"].value;

  preloader(addCardPopupButton, true);

  saveCard(cardName, cardLink)
    .then((res) => {
      cardsContainer.prepend(
        createCard(
          res,
          // { name: cardName, link: cardLink },
          deleteCard,
          likeCard,
          zoomImage,
          userInfo._id
        )
      );
      closeModal(addCardPopup);
      addCardForm.reset();
    })
    .catch((err) => console.log("handleAddCardFormSubmit: ", err))
    .finally(() => {
      preloader(addCardPopupButton, false);
    });
}

editProfileFormElement.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

Promise.all([getCards(), getMe()])
  .then(([cards, user]) => {
    userInfo = user;

    updateProfileInHtml(userInfo.name, userInfo.about);
    updateAvatarInHtml(editAvatarButton, userInfo.avatar);

    cards.forEach((cardInfo) => {
      cardsContainer.append(
        createCard(cardInfo, deleteCard, likeCard, zoomImage, userInfo._id)
      );
    });
  })
  .catch((err) => {
    console.log("Promise.all err", err);
  });
