import React, { useEffect } from 'react'
import { Card } from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main (props) {
  const currentUser = React.useContext(CurrentUserContext)
  
  useEffect(() => {
    props.getData()
  },[])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__img-container">
          <img  className="profile__image" alt="" id="profileImage"style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
          <div className="profile__img-overlay">
            <button className="profile__img-btn" onClick={props.onEditAvatar} type="button" aria-label="Редактировать картинку"></button>
          </div>
        </div>
        <div className="profile__container">
          <div className="profile__button-wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-btn" onClick={props.onEditProfile} type="button" aria-label="Редактировать"></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={props.onAddPlace} type="button" aria-label="Добавить"></button>
      </section>
      <section className="places">
        {props.cards.map((card) => (
          <Card 
          key={card._id}
          onSelectCard={props.onSelectCard}
          onSelectCurrentCard={props.onSelectCurrentCard}
          card={card}
          onCardLike = {props.onCardLike}
          onCardDelete = {props.onDelete}
          />
        ))}
      </section>
    </main>
  )
}
