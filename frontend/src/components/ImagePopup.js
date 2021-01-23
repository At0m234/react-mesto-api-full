import React from 'react'

export function ImagePopup(props) {

  function handleClose(e){
    if (e.target.classList.contains('popup')) 
      props.onClose();
  }

  if (props.isOpen) { 
    return (
      <section className="popup popup_img popup_opened" onClick={e=>handleClose(e)} id="popup_img">
        <figure className="popup__img-container" id="img_container">
          <button className="popup__close-icon popup__close-icon_img" onClick={props.onClose} type="button" aria-label="Закрыть" id="imgPopupClose"></button>
          <img className="popup__big-img" src={props.chosenCard.link} alt="loading..."  name=""/>
          <figcaption className="popup__caption">{props.chosenCard.name}</figcaption>
        </figure>
      </section>
    )}
    return "";
}
