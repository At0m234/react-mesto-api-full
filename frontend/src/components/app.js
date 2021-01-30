
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import { Header } from "./Header"
import { Main } from "./Main.js"
import { Footer } from "./Footer.js"
import { Api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { ImagePopup } from "./ImagePopup"
import { AddPlacePopup } from './AddPlacePopup';
import { SuggestionPopup } from './SuggestionPopup'
import ProtectedRoute from './ProtectedRoute'; 
import { Login } from "./Login";
import { Register } from "./Register";
import * as cardsAuth from '../utils/cardsAuth.js'
import { InfoTooltip } from './InfoTooltip';
import { BASE_URL } from '../utils/constants';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isSuggestionOpen, setSuggestionOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({ 'name':'', 'profession':'', '_id': '' ,'avatar': ""});
  const [cards, setCards] = useState([])
  const [isLogged, setLogged] = useState(false)
  const [userData, setUserData] = useState({email: "", password: ""})
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false)
  const [message, setMessage] = useState('');
  const [userLocalData, setUserLocalData] = useState({email: "", password: ""});
  const [token, setToken] = useState("")
  const [myApi, setMyApi] = useState(new Api({
    'url': BASE_URL, 'token': ""
  }))
  const ESC_KEYCODE = 27;
  const history = useHistory();



  function handleSignOut() {
    localStorage.clear()
    setMyApi(new Api({
      'url': BASE_URL, 'token': ""
    }))
    setCurrentUser({ 'name':'', 'profession':'', '_id': '' ,'avatar': ""})
    setUserLocalData({email: "", password: ""})
    setToken("")
    setLogged(false)
    history.push('/signin')
  }

  const tokenCheck = () => {
    if(localStorage.getItem('jwt')) {
      cardsAuth.getContent(localStorage.getItem('jwt'))
        .then((res) => {
        if (res) {
          if (res.email) {
              setUserData({
                email: res.email,
                _id: res._id
              })
              setCurrentUser({ 'name':res.name, 'profession':res.about, '_id': res._id, 'avatar': res.avatar })
              localStorage.setItem("CurrentUser", JSON.stringify({ 'name':res.name, 'profession':res.about, '_id': res._id, 'avatar': res.avatar }))
              localStorage.setItem('isLogged', true)
              localStorage.setItem("UserData", JSON.stringify({email: res.email, password: res._id}))
              setLogged(true)
              history.push('/')
          }
        } else {
            setMessage('Что-то пошло не так! Попробуйте ещё раз.')
            setInfoTooltipOpen(true)
          }
        })
    }
  }

  function handleUpdateUser(obj) {
    const newInfo = currentUser
    newInfo.name = obj.name
    newInfo.about = obj.profession
    myApi.editUserInfo(newInfo)
      .then(res=> {
        setCurrentUser(newInfo);
        closeAllPopups()
      })
      .catch(e=>{console.log(e)})
  }
  
  function handleDeleteClick(card){
    myApi.getCards()
      .then((res)=> {
        if (res)
        setCards(res.cards)
        const isOwner = card.owner[0] === currentUser._id;
        if (isOwner) {
          myApi.removeCard(card._id);
          setCards(cards.filter(i=>i._id !== card._id))
        };
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(obj) {
    myApi.addNewCard(obj).then(res=> {  
      myApi.getCards()
        .then((res)=> {
          if (res)
          setCards(res.cards)
        })
        .catch(err => console.log(err));
    closeAllPopups();
    })
  }

  function handleUpdateAvatar(url) {
    const newInfo = currentUser
    newInfo.avatar = url
    myApi.changeUserAvatar(url)
      .then(res=> {
        setCurrentUser(newInfo);
        closeAllPopups()
      })
      .catch(e=>{console.log(e)})
  }

  useEffect(()=> {
    if (localStorage.getItem("isLogged") != null) setLogged(localStorage.getItem("isLogged"))
    if (localStorage.getItem("CurrentUser") != null){
      setCurrentUser(JSON.parse(localStorage.getItem("CurrentUser")))
    } 
    if (localStorage.getItem("UserData") != null) setUserData(JSON.parse(localStorage.getItem("UserData")))
    if (localStorage.getItem("userLocalData") != null) setUserLocalData(JSON.parse(localStorage.getItem("userLocalData")))
    if (localStorage.getItem('jwt') != null) setToken(localStorage.getItem('jwt'))
    setMyApi(new Api({
      'url': BASE_URL, 'token': localStorage.getItem('jwt')
    }))
    myApi.getCards()
      .then((res)=> {
        if (res)
          setCards(res.cards)
      }
      )
      .catch(err => console.log(err));
  },[token])

  function handleDeleteButton() {
    closeAllPopups()
    setSuggestionOpen(true)
  }

  function handleCardSetCurrent(card) {
    setSelectedCard(card)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function handleEditAvatarClick() {
    closeAllPopups()
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    closeAllPopups()
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    closeAllPopups()
    setIsAddPlacePopupOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      myApi.removeLike(card._id)
      .then(res=>{
        card.likes = card.likes.filter(i=>i._id !== currentUser._id)
        setCards(cards)
        getData()
      })
      .catch(e=>{console.log(e)}); ;
      } else { 
        myApi.addLike(card._id)
        .then(res=>{
          card.likes.push(currentUser);
          setCards(cards)
          getData()
        })
        .catch(e=>{console.log(e)}); 
      }
    }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setSuggestionOpen(false)
  }

  function getData() {
    myApi.getCards()
      .then((res)=> {
        if (res !== null)
        {setCards(res.cards) }
      })
      .catch(err => console.log(err));

    myApi.getUserInfo()
      .then((res)=>{
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    function getIt(evt){
      handleCloseClick(evt)
    }
    document.addEventListener("keydown", (evt)=>{
      if(evt.keyCode === ESC_KEYCODE)getIt(evt)
    })
    return ()=>{
      document.removeEventListener("keydown", (evt)=>{getIt(evt)})
    }
  },[]);

  function handleCloseClick (evt) {
    evt.preventDefault()
    if (evt.keyCode === ESC_KEYCODE || evt.target.classList.contains('popup') || evt.target.classList.contains('popup__save') || evt.target.classList.contains('popup__close-icon'))
      {closeAllPopups();}
  }

  function closeinfoTooltip(){
    setInfoTooltipOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header onSignOut={handleSignOut} userdata={userData}/>
          <Switch>
            <ProtectedRoute exact path="/" component={Main} 
              isLogged={localStorage.getItem("isLogged")}
              isEditAvatarPopupOpen={isEditAvatarPopupOpen}
              isEditProfilePopupOpen={isEditProfilePopupOpen} 
              isAddPlacePopupOpen={isAddPlacePopupOpen}
              isSuggestionOpen={isSuggestionOpen}
              onDelete={handleDeleteButton}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onSelectCard={handleCardClick}
              onSelectCurrentCard={handleCardSetCurrent}
              setCards={setCards}
              cards={cards}
              isImagePopupOpen={isImagePopupOpen}
              getData={getData}
              onCardLike={handleCardLike}
            />
            <Route exact path="/signup">
              <Register setInfoTooltipOpen={setInfoTooltipOpen} setMessage={setMessage}/>
            </Route>
            <ProtectedRoute  component={Login}  exact path="/signin"
                isLogged={!localStorage.getItem("isLogged")}
                setMyApi={setMyApi}
                setUserLocalData={setUserLocalData} 
                setInfoTooltipOpen={setInfoTooltipOpen} 
                tokenCheck={tokenCheck} 
                setMessage={setMessage}
            />
            <Route>
              {localStorage.getItem("isLogged") ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlace}
            onSubmit={handleAddPlace}
          />
          <SuggestionPopup 
            isOpen={isSuggestionOpen} 
            onClose={closeAllPopups}
            selectedCard={selectedCard}
            onDelete={handleDeleteClick} 
            onSubmit={handleDeleteClick}
          >
          </SuggestionPopup>
          <InfoTooltip 
          infoTooltipOpen={infoTooltipOpen}
          message={message} 
          closeinfoTooltip={closeinfoTooltip}>
          </InfoTooltip>
          <ImagePopup 
            chosenCard={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen} 
          />
          <Footer/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
