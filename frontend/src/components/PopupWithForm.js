import React from 'react'

export function PopupWithForm(props) {
  return (
    <section className={"popup popup_"+props.name+' popup_opened'} onClick={e=>props.onOverlayClose(e)} >
      <form className={"popup__container popup__container_"+props.name} onSubmit={props.onSubmit} method="PATCH" action="#" noValidate>
        <h3 className="popup__title">{props.title}</h3>
        <button className="popup__close-icon" onClick={props.onClose} type="button" aria-label="Закрыть"></button>
        {props.children}
      </form>
    </section>
  )
}
