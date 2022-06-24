import axios from '@/utils/request'

export function checkOut(data) {
  return axios.post('/checkout', data)
}

export function getDeliveryTypes() {
  return axios.get('/delivery-types')
}
