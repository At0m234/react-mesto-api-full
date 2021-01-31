import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as cardsAuth from '../utils/cardsAuth.js';

export function Register(props) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    cardsAuth.register(email, password)
      .then((res)=> {
        if (res.status !== 400) {
          props.setMessage('Вы успешно зарегистрировались!')
          props.setInfoTooltipOpen(true)
        } else {
          props.setMessage('Что-то пошло не так! Попробуйте ещё раз.')
          props.setInfoTooltipOpen(true)
        }
      })
  }
  
  return (
    <form className="entry" onSubmit={handleSubmit} method="POST" noValidate >
      <h1 className="entry__title">Регистрация</h1>
      <input className="entry__email" onChange={handleEmailChange} type="email" required placeholder="Email" minLength="2" maxLength="40" pattern="[A-Za-zА-Яа-яЁё -]{1,}"/>
      <input className="entry__password" onChange={handlePasswordChange} type="password" required placeholder="Пароль" minLength="2" maxLength="40" pattern="[A-Za-zА-Яа-яЁё -]{1,}"/>
      <button className="entry__submit" type="submit" >Зарегистрироваться</button>
      <span className="entry__sign-in">Уже зарегистрированы?<Link to="/signin" className="entry__link">Войти</Link></span>
    </form>
  )
}