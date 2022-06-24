import axios from '@/utils/request'

export function getCartItems() {
  return axios.get('/basket-items-by-user')
}

export function addItemToCart(data) {
  return axios.post('/basket-items', data)
}

export function removeItemFromCart(id) {
  return axios.delete(`/basket-items/${id}`)
}

// export function checkOut() {
//   return axios.get('/checkout-basket')
// }

export function getOrderHistory() {
  return axios.get('/orders-by-user')
}
