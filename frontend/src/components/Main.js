import React from 'react'
import { Card } from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main (props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__img-container">
          <img  className="profile__image" alt="" id="profileImage"style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
        </div>
        <div className="profile__container">
          <div className="profile__button-wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
          </div>
          <p className="profile__profession">{currentUser.profession}</p>
        </div>
        <button className="profile__add-btn" onClick={props.onAddPlace} type="button" aria-label="Добавить"></button>
      </section>
      <section className="places">
      {props.cards && props.cards.map((card) => (
              <Card 
              key={card._id}
              onSelectCard={props.onSelectCard}
              onSelectCurrentCard={props.onSelectCurrentCard}
              card={card}
              onCardLike = {props.onCardLike}
              onCardDelete = {props.onDelete}
              />
            ))
          }
      </section>
    </main>
  )
}
