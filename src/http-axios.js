import axios from 'axios'

const config = {
  baseURL: 'http://localhost:1337',
  //  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'X-Parse-Application-Id': 'fe2b106bb08b82fd58f24ae261fbf5bbec81354a'
  }
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const HTTP = axios.create(config)

HTTP.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
HTTP.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    let errorMessage = ''
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      console.log(error.response)
      // console.log(error.response.status)
      // console.log(error.response.headers)

      errorMessage = (error.response.data && error.response.data.msg) ? error.response.data.msg : ''
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    error.message = errorMessage
    return Promise.reject(error)
  }
)

export default HTTP
