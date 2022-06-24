import axios from '@/utils/request'

export function getRemedies(param) {
  return axios.get(`/remedies${param}`)
}

export function getRemedyDetail(id) {
  return axios.get(`/remedies/${id}`)
}

export function getCategories() {
  return axios.get('/remedy-categories')
}

export function addFav(id) {
  return axios.get(`/add-fav-remedy/${id}`)
}
