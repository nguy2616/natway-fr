import axios from 'axios'
import store from '../store'
// import { getToken } from '@/utils/auth'
import { baseURL } from '@/utils/constant'

const service = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
    // 'X-Requested-With': 'XMLHttpRequest'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.state.auth.jwt) {
    //  console.log(`Bearer ${store.state.auth.jwt}`)
    //  console.log(getToken())
      config.headers.Authorization = `Bearer ${store.state.auth.jwt}`
    }
    // if (window.Echo) {
    //  config.headers['X-Socket-ID'] = window.Echo.socketId()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error.message) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response
    return res
  },
  error => {
    let errorMessage = ''

    if (error.response) {
      if (error.response.status === 402) {
        // payment failed
        return Promise.resolve(error.response)
      }
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.status)
      // console.log('error.response', error.response)
      errorMessage =
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.response.data.msg
            ? error.response.data.msg
            : ''
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request)
      // console.log('error.request', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message)
    }
    if (error.response && error.response.data) {
      errorMessage = error.response.data.msg
        ? error.response.data.msg : error.response.data.message[0].messages[0].message
          ? error.response.data.message[0].messages[0].message : error.response.data.errors // 400 error
            ? error.response.data.errors[0] : 'An error occurred!'
    }
    error.message = errorMessage
    return Promise.reject(error)
  }
)

export default service
