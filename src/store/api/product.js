import axios from '@/utils/request'

export function getProducts(param) {
  return axios.get(`/products${param}`)
}

export function getProductDetail(id) {
  return axios.get(`/products/${id}`)
}

export function getReviews() {
  return axios.get('/remedy-categories')
}

export function addFav(id) {
  return axios.get(`/add-fav-product/${id}`)
}
