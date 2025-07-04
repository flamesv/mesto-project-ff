const showInputError = (inputElement, errorMessage, config) => {
  const errorElement = inputElement.nextElementSibling;

  errorElement.textContent = errorMessage;

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (inputElement, config) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableSubmitButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, config) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  // console.log(config);
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const fieldsetList = Array.from(
      formElement.querySelectorAll(config.fieldsetSelector)
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, config);
    });
  });
};

export const clearValidation = (form, config) => {
  const buttonElement = form.querySelector(config.submitButtonSelector);
  buttonElement.disabled = true;
  disableSubmitButton(buttonElement, config);
  const formInputs = form.querySelectorAll(config.inputSelector);
  formInputs.forEach((inputElement) => {
    hideInputError(inputElement, config);
  });
};
