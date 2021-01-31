import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg'

export function InfoTooltip(props) {
  let image = fail
  if (props.message !== "Что-то пошло не так! Попробуйте ещё раз.") {
    image = success
    
  }

  if (props.infoTooltipOpen) {
    return (
      <section className="popup popup__infoTooltip popup_opened" onClick={props.closeinfoTooltip}>
        <div className="popup__container"></div>
        <button className="popup__close-icon" onClick={props.closeinfoTooltip} type="button" aria-label="Закрыть"></button>
        <img alt={props.message} src={image}/>
        <p className="popup__title">Что-то пошло не так! Попробуйте ещё раз.</p>
      </section>
    )} else {
      return ""
    }
}
