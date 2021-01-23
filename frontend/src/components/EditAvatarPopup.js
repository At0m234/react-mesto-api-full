import React  from 'react'
import { PopupWithForm } from './PopupWithForm';

export function EditAvatarPopup(props) {
  // записываем объект, возвращаемый хуком, в переменную
  const editAvatar = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(editAvatar.current.value)
  } 

  function handleClose(e) {
    if (e.target.classList.contains('popup')) 
      props.onClose();
  }

  if (props.isOpen) {
    return (
      <PopupWithForm 
        name="avatar" 
        title="Изменить аватар" 
        onOverlayClose={handleClose}
        onClose={props.onClose}
      >
        <input className="popup__text popup__text_name popup__text_avatar" ref={editAvatar} type="url" required placeholder="Ссылка на картинку" />
        <button className="popup__save popup__save_avatar" onClick = {e=>handleSubmit(e)} type="submit">Сохранить</button>
      </PopupWithForm>
    )
  }
  return ""
}
