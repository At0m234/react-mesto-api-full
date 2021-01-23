import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import logo from '../images/logo_mesto_white.svg';

export function Header(props) {
  const history = useHistory();

  return (
    <Switch>
      <Route path='/signup'>
        <header className="header">
          <img src={logo} alt="Логотип" className="header__logo"/>
          <button className="header__btn" onClick={()=>{history.push('/signin')}}>Войти</button>
        </header>
      </Route>
      <Route path='/signin'>
        <header className="header">
          <img src={logo} alt="Логотип" className="header__logo"/>
          <button className="header__btn" onClick={()=>{history.push('/signup')}}>Регистрация</button>
        </header>
      </Route>
      <Route path='/'>
        <header className="header">
          <img src={logo} alt="Логотип" className="header__logo"/>
          <div className="header__signout">
            <p className="header__username">{props.userdata.email}</p>
            <button className="header__btn" onClick={props.onSignOut}>Выйти</button>
          </div>
        </header>
      </Route>
    </Switch>
  )
}
