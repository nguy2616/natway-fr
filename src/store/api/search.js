import axios from '@/utils/request'

export function searchAll(param) {
  return axios.get(`/home${param}`)
}
