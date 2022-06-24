import axios from '@/utils/request'

// export function getCartItems() {
//   return axios.get('/basket-items-by-user')
// }

export function storePaypalIds(data) {
  return axios.post('/paypal-orders', data)
}

// export function removeItemFromCart(id) {
//   return axios.delete(`/basket-items/${id}`)
// }

// export function getOrderHistory() {
//   return axios.get('/orders-by-user')
// }
