import React, { useState } from 'react';
import * as cardsAuth from '../utils/cardsAuth.js'

export const Login = (props) => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      return
    }
    cardsAuth.authorize(username, password)
    .then((data) => {
      if(!data) {
        props.setMessage('Что-то пошло не так! Попробуйте ещё раз.')
      }
        props.setUserLocalData({'email':username,'password': password})
        props.tokenCheck()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <form className="entry" onSubmit={handleSubmit} method="POST" action="#" noValidate>
      <h1 className="entry__title">Вход</h1>
      <input className="entry__email" onChange={handleUsernameChange} required type="email" placeholder="Email"  minLength="2" maxLength="40" pattern="[A-Za-zА-Яа-яЁё -]{1,}"/>
      <input className="entry__password" onChange={handlePasswordChange} required type="password" placeholder="Пароль" minLength="2" maxLength="40" pattern="[A-Za-zА-Яа-яЁё -]{1,}"/>
      <button className="entry__submit" type="submit">Войти</button>
    </form>
  )
}