import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

export function Card(props) {
  const currentUser= React.useContext(CurrentUserContext)
  
  function handleClick() {
    props.onSelectCurrentCard(props.card)
  }

  function handleDeleteClick(){
    props.onDelete()
  }

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    "place__trash " + `${props.card.owner[0] === currentUser._id ? ' ' : ' place__trash_invisible'}`
  ); 

  return (  
    <div>
      <div className="place" onClick={handleClick}>
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить"></button>
        <img className="place__image" onClick={props.onSelectCard} src={props.card.link} alt={props.card.name} />
        <div className="place__info">
          <h2 className="place__name">{props.card.name}</h2>
        </div>
      </div>
    </div>
  )
}