import React, { useState }  from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { PopupWithForm } from './PopupWithForm'

export function EditProfilePopup(props) {
  const [name, setName] = useState('')
  const [description , setDescription] = useState('')
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    e.preventDefault();
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    e.preventDefault();
    setDescription(e.target.value)
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      'name': name,
      'profession': description,
    });
  } 

  function handleClose(e) {
    if (e.target.classList.contains('popup')) 
      props.onClose();
  }

  if (props.isOpen) {
    return (
      <PopupWithForm 
        name="profile" 
        title="Редактировать профиль" 
        onOverlayClose={handleClose}
        onClose={props.onClose}
      >
        <input className="popup__text popup__text_name" onChange={handleChangeName} value={name} type="text" required placeholder="Имя" minLength="2" maxLength="40" pattern="[A-Za-zА-Яа-яЁё -]{1,}"/>
        <span className="popup__input_error"/>
        <input  className="popup__text popup__text_profession" onChange={handleChangeDescription} value={description} type="text" required placeholder="Профессия" minLength="2" maxLength="40" pattern="[A-Za-zА-Яа-яЁё -]{1,}"/>
        <span className="popup__input_error"/>
        <button className="popup__save popup__save_edit" onClick={e=>handleSubmit(e)} type="submit">Сохранить</button>
      </PopupWithForm>
    )
  }
    return ""
}
