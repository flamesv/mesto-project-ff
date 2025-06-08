let currentModal;

function openModal(modal) {
  currentModal = modal;
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("click", handleClick);
}

function closeModal(modal) {
  currentModal = null;
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("click", handleClick);
}

function handleEscape(e) {
  if (e.key === "Escape") {
    return closeModal(currentModal);
  }
}

function handleClick(e) {
  if (
    e.target.classList.contains("popup__close") ||
    e.target.classList.contains("popup")
  ) {
    return closeModal(currentModal);
  }
}

export { openModal, closeModal };
