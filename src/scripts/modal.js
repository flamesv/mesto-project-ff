function closePopupHandler(popup, doClose = false) {
  const handleOverlayClick = (e) => {
    if (
      doClose ||
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__close")
    ) {
      return closePopup(popup);
    }
  };

  const handleEscapePress = (e) => {
    if (e.key === "Escape") {
      return closePopup(popup);
    }
  };

  function closePopup(popup) {
    popup.querySelector("form")?.reset();
    popup.classList.remove("popup_is-opened");
    popup.removeEventListener("click", handleOverlayClick);
    document.removeEventListener("keydown", handleEscapePress);
  }
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscapePress);
}

function openPopupHandler(popup) {
  popup.classList.add("popup_is-opened");
  closePopupHandler(popup);
}

export { closePopupHandler as closeModal, openPopupHandler as openModal };
