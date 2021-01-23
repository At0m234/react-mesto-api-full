// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ - ПОИСК И ДОБАВЛЕНИЕ В DOM
export const nameInput = document.querySelector(".popup__text_name");
export const jobInput = document.querySelector(".popup__text_profession");
export const profileTitle = document.querySelector(".profile__title");
export const profileProfession = document.querySelector(".profile__profession");
export const profileImage = document.querySelector(".profile__image");
export const places = document.querySelector(".places");
// Переменные попапа редактирования профиля
export const formEdit = document.forms.edit;
export const editBtn = document.querySelector(".profile__edit-btn");
export const EditSaveBtn = formEdit.elements.save;
export const inputsListFormEdit = Array.from(formEdit.querySelectorAll('.popup__text'));
// Переменные попапа добавления карточки
export const formAdd = document.forms.add;
export const addBtn = document.querySelector(".profile__add-btn");
export const addCreateBtn = formAdd.elements.create;;
export const inputsListFormAdd = Array.from(formAdd.querySelectorAll('.popup__text'));
// Переменные попапа смены аватара пользователя
export const formAvatar = document.forms.avatar;
export const editAvatar = document.querySelector(".profile__img-btn");
export const editAvatarBtn = formAvatar.elements.avatar;
export const inputsListFormAvatar = Array.from(formAvatar.querySelectorAll('.popup__text'));


// Объект с селекторами классов форм
export const configObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input_error_active',
};