import axios from '@/utils/request'

export function postSchool(data) {
  return axios.post('/schools', data)
}

export function getSchools() {
  return axios.get('/schools')
}
