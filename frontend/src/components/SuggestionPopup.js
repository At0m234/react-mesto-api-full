import React  from 'react'

export function SuggestionPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete(props.selectedCard)
    props.onClose()
  } 

  function handleClose(e) {
    if (e.target.classList.contains('popup')) 
      props.onClose();
  }

  if (props.isOpen) {
    return (
      <section className="popup popup_suggestion popup_opened" onClick={e=>handleClose(e)}>
        <form className="popup__container popup__container_suggestion" method="PATCH" action="#" noValidate>
          <span className="popup__input_error"></span>
          <h3 className="popup__title">Вы уверены?</h3>
          <button className="popup__close-icon" onClick={props.onClose} type="button" aria-label="Закрыть"></button>
          <button className="popup__save" onClick={e=>handleSubmit(e)} type="submit" id="agreeBtn">Да</button>
        </form>
      </section>
    )
  }
    return ""
}
