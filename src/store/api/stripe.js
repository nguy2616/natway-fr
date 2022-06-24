import axios from '@/utils/request'

export function getCardsList() {
  return axios.get('/get-cards')
}
