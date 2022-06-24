import axios from '@/utils/request'

export function upload(formData) {
  return axios.post('/upload', formData)
}
