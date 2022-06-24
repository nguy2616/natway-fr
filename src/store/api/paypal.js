import axios from '@/utils/request'

// export function createOrder() {
//   return axios.get('/create-paypal-order')
// }

export function createOrder(data) {
  return axios.post('/create-paypal-order', data)
}
