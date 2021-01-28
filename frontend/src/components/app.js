
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import { Header } from "./Header"
import { Main } from "./Main.js"
import { Footer } from "./Footer.js"
import { Api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { EditProfilePopup } from './EditProfilePopup'
import { EditAvatarPopup } from './EditAvatarPopup'
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
  const [currentUser, setCurrentUser] = useState({ 'name':'', 'profession':'', 'id': '' ,'avatar': ""});
  const [cards, setCards] = useState([])
  const [isLogged, setLogged] = useState(false)
  const [userData, setUserData] = useState({email: "", password: ""})
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false)
  const [message, setMessage] = useState('');
  const [userLocalData, setUserLocalData] = useState({email: "", password: ""});
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [myApi, setMyApi] = useState(new Api({
    'url': BASE_URL, 'token': token
  }))
  const ESC_KEYCODE = 27;
  const history = useHistory();

  const handleLogin = () => {
    localStorage.setItem('isLogged', true)
    localStorage.setItem("CurrentUser", JSON.stringify(currentUser))
    localStorage.setItem("UserData", JSON.stringify(userData))
    setLogged(true)
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLogged')
    localStorage.removeItem("CurrentUser")
    localStorage.removeItem("UserLocalData")
    setLogged(false)
    history.push('/signin')
  }

  const tokenCheck = () => {
    if(localStorage.getItem('jwt')) {
      cardsAuth.getContent(localStorage.getItem('jwt'))
        .then((res) => {
          console.log(res)
        if (res){
          if (res.email) {
            if (res.email === userLocalData.email)
            {
              setLogged(true)
              setUserData({
                email: res.email,
                _id: res._id
              })
              setCurrentUser({ 'name':res.name, 'profession':res.about, 'avatar': res.avatar })
              handleLogin()
              history.push('/')
            }
          }
        } else {
            setMessage('Что-то пошло не так! Попробуйте ещё раз.')
            setInfoTooltipOpen(true)
          }
  })}}

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
        setCards(res)
        const isOwner = card.owner._id === currentUser._id;
        if (isOwner) {
          myApi.removeCard(card._id);
          setCards(cards.filter(i=>i._id !== card._id)
        )};
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(obj) {
    myApi.addNewCard(obj).then(res=> {  
      myApi.getCards()
        .then((res)=> {
          setCards(res)
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
    setLogged(localStorage.getItem("isLogged"))
    setCurrentUser(JSON.parse(localStorage.getItem("CurrentUser")))
    setUserData(JSON.parse(localStorage.getItem("UserData")))
    myApi.getUserInfo()
      .then(res=> {
        setCurrentUser(res)
      })
      .catch(e=>{console.log(e)})
  },[])

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
        if (res)
        console.log("res " + res.json())
        setCards(res) 
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
                handleLogin={handleLogin} 
                tokenCheck={tokenCheck} 
                setMessage={setMessage}
            />
            <Route>
              {localStorage.getItem("isLogged") ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser = {handleUpdateUser}
            onSubmit={handleUpdateUser}
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
            onSubmit={handleUpdateAvatar}
          /> 
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
