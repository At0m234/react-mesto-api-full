export class Api {
  constructor({url, authorization}) {
    this._url = url;
    this._token = authorization;
    this._headers =  {
      'authorization': 'Bearer ' + this._token,
      'Content-Type': 'application/json',
    }
  }

  changeToken(token) {
    this._token = token;
  }
  // Приватный метод проверки ответа сервера и преобразование из json
  _getResponseData(additionalUrl, optionsObj) {
    return fetch(this._url  + additionalUrl, optionsObj)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // Метод загрузки информации о пользователе с сервера
  getUserInfo() {
    return this._getResponseData('/users/me', { headers: this._headers });
  }

  // Метод загрузки карточек с сервера
  getCards() {
    return this._getResponseData('/cards', { headers: this._headers });
  }

  // Метод добавления новой карточки на сервер
  addNewCard(formData) {
    return this._getResponseData('/cards', {
      method: 'POST',
      headers:  this._headers,
      body: JSON.stringify({
        name: formData.title,
        link: formData.place
      })
    })
  }

  // Метод удаления карточки с сервера
  removeCard(cardId) {
    return this._getResponseData('/cards/' + cardId, {
      method: 'DELETE',
      headers:  this._headers,
    })
  }
}
