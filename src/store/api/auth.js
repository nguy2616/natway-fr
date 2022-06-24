import axios from '@/utils/request'

export function login(data) {
  return axios.post('/auth/local', data)
}

export function signup(data) {
  return axios.post('/auth/local/register', data)
}

export function signupWithProvider(provider, param) {
  return axios.get(`/auth/${provider}/callback`, { params: param })
}

export function getCharterContents(param) {
  return axios.get(`/charter-contents/${param}`)
}

export function getPrecautionContents() {
  return axios.get('/precaution-contents')
}

export function checkEmail(data) {
  return axios.post('/email-check', data)
}

export function forgotPassword(data) {
  return axios.post('/auth/forgot-password', data)
}

export function resetPassword(data) {
  return axios.post('/auth/reset-password', data)
}
