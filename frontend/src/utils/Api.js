export class Api {
  constructor({url, token}) {
    this._url = url;
    this._token = token;
    this._headers =  {
      'token': 'Bearer ' + this._token,
      'Content-Type': 'application/json',
    }
  }

  changeToken(token) {
    this._token = token;
  }
  // Приватный метод проверки ответа сервера и преобразование из json
  // _getResponseData(additionalUrl, optionsObj) {
  //   return fetch(this._url  + additionalUrl, optionsObj)
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json()
  //       }
  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  // }

  // Метод загрузки информации о пользователе с сервера
  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: {
        authorization: this._headers
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  // Метод загрузки карточек с сервера
  getCards() {
    return fetch(this._url + '/cards', {
      headers: {
        authorization: this._headers
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  // Метод добавления новой карточки на сервер
  addNewCard(formData) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.place,
        link: formData.url
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }

  // Метод удаления карточки с сервера
  removeCard(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._headers
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    });
  }
}
