export const BASE__URL = 'http://api.MIC.students.nomoredomains.icu/';

export const register = (email, password) => {
  return fetch(`${BASE__URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    localStorage.setItem('password', '12345')
    localStorage.setItem('email', 'v.o.ilin@yandex.ru')
    return data
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
    body: JSON.stringify( {
      "email": email,
      "password": password, 
    })
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

export const getContent = () => {
  let token = localStorage.getItem('jwt')
  if (localStorage.getItem('jwt'))
  {return fetch (`${BASE__URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res)=> {return res.json()})
    .then(data => {
      return data.data
    
  })} else {
    console.log("Token не найден")
    }
}