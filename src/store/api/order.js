import axios from '@/utils/request'

export function checkOut(data) {
  return axios.post('/checkout', data)
}

export function getDeliveryTypes() {
  return axios.get('/delivery-types')
}

export function createShippingAddress(data) {
  return axios.post('/user-delivery-addresses', data)
}

export function getShippingAddresses() {
  return axios.get('/user-delivery-addresses')
}
