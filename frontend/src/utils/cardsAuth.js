import { BASE_URL } from '../utils/constants.js';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })
}

export const authorize = (email, password ) => {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( { email, password })
  })
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    localStorage.setItem('jwt', data.token)
    return {jwt:data.token}
  })
  .catch((err) => {
    console.log(err)
  })
}

export const getContent = (token) => {
  if (localStorage.getItem('jwt'))
  {
    return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    }
  })
    .then((res)=> {return res.json()})
    .then(data => {
      return data.user
    })
    .catch((err) => {
      console.log(err)
    })
  } else {
    console.log("Token не найден")
  }
}