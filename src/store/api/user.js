import axios from '@/utils/request'

export function updateProfile(userdata) {
  return axios.put(`/users/${userdata.id}`, userdata)
}

export function deleteAccount(id) {
  return axios.delete(`/users/${id}`)
}
