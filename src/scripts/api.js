const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "f73b9fbd-596b-4475-9e6a-f823884a00f9",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getMe = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then(handleResponse);
};

export const getCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then(handleResponse);
};

export const saveCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
    method: "POST",
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResponse);
};

export const saveLike = (cardId, isLiked) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    headers: apiConfig.headers,
    method: isLiked ? "DELETE" : "PUT",
  }).then(handleResponse);
};

export const saveDeleteCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    headers: apiConfig.headers,
    method: "DELETE",
  }).then(handleResponse);
};

export const updateAvatar = (avatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    headers: apiConfig.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar,
    }),
  }).then(handleResponse);
};

export const updateProfile = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
    method: "PATCH",
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(handleResponse);
};
