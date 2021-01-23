import React  from 'react'
import { PopupWithForm } from './PopupWithForm'

export function AddPlacePopup(props) {
  const editTitle = React.useRef();
  const editPlace = React.useRef(); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      'title':editTitle.current.value,
      'place':editPlace.current.value
    })
  } 

  function handleClose(e) {
    if (e.target.classList.contains('popup')) 
      props.onClose()
  }

  if (props.isOpen) {
    return (
      <PopupWithForm 
        name="addplace" 
        title="Добавить место" 
        onOverlayClose={handleClose}
        onClose={props.onClose}
      >
        <input className="popup__text popup__text_name" ref={editTitle} type="text" required placeholder="Название" minLength="1" maxLength="30"/>
        <span className="popup__input_error"/>
        <input className="popup__text popup__text_profession" ref={editPlace} type="url" required placeholder="Ссылка на картинку"/>
        <span className="popup__input_error"/>
        <button className="popup__save popup__save_add" onClick={e=>handleSubmit(e)} type="submit">Сохранить</button>
      </PopupWithForm>
    )
  }
    return ""
}
