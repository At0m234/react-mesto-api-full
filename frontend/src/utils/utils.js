// Функция отображения состояния кнопки сабмита во время загрузки данных
export function saving(inProgress) {
  if (inProgress) {
    document.querySelector('.popup__save_edit').textContent = 'Сохранение...';
    document.querySelector('.popup__save_create').textContent = 'Сохранение...';
    document.querySelector('.popup__save_avatar').textContent = 'Сохранение...';
  } else {
    document.querySelector('.popup__save_edit').textContent = 'Сохранить';
    document.querySelector('.popup__save_create').textContent = 'Создать';
    document.querySelector('.popup__save_avatar').textContent = 'Сохранить';
  }
}