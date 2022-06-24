import Cookies from 'js-cookie'

const tokenKey = ''

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}

export function getFullName(user) {
  let fullName = ''
  if (user.firstName && user.lastName) {
    fullName = user.firstName + ' ' + user.lastName
  } else if (user.firstName) {
    fullName = user.firstName
  } else if (user.lastName) {
    fullName = user.lastName
  } else {
    fullName = user.username
  }
  return fullName
}
