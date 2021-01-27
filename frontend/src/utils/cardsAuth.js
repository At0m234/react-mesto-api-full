export const BASE__URL = 'http://api.pic.students.nomoredomains.icu';

export const register = (email, password) => {
  return fetch(`${BASE__URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return res.json()
  })
  .catch((err) => {
    console.log(err)
  })
}

export const authorize = (email, password ) => {
  return fetch (`${BASE__URL}/signin`, {
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
  return fetch (`${BASE__URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "token": `Bearer ${token}`
    }
  })
    .then((res)=> {return res.json()})
    .then(data => {
      return data.user
  })
    .catch((err) => {
      console.log("err")
    })
}