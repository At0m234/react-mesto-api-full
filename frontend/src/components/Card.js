import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

export function Card(props) {
  const currentUser= React.useContext(CurrentUserContext)
  
  function handleClick() {
    props.onSelectCurrentCard(props.card)
  }

  function handleLikeClick(){
    props.onCardLike(props.card)
  }

  function handleDeleteClick(){
    props.onCardDelete()
  }

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    "place__trash " + `${props.card.owner[0] === currentUser._id ? ' ' : ' place__trash_invisible'}`
  ); 
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    "place__like-icon" + `${isLiked ? ' place__like-icon_filled' : ''}`
  )

  return (  
    <div>
      <div className="place" onClick={handleClick}>
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить"></button>
        <img className="place__image" onClick={props.onSelectCard} src={props.card.link} alt={props.card.name} />
        <div className="place__info">
          <h2 className="place__name">{props.card.name}</h2>
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Мне нравится"></button>
          <span className="place__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}