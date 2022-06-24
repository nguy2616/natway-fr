import axios from '@/utils/request'

export function getNaturopath(param) {
  return axios.get(`/naturopaths${param}`)
}

export function getNaturopathDetail(id) {
  return axios.get(`/naturopaths/${id}`)
}

export function getSpecialities() {
  return axios.get('/specialities')
}

export function addFav(id) {
  return axios.get(`/add-fav-naturopath/${id}`)
}

export function postReview(content) {
  return axios.post('/naturopath-reviews', content)
}
