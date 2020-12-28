import axios, { AxiosError } from 'axios'
import { apiUrl } from 'configs/index.json'

//intercept requests
axios.interceptors.request.use((config) => {
  config.baseURL = apiUrl

  config.withCredentials = false

  config.headers = {
    'Access-Control-Allow-Origin': '*',
  }

  if (localStorage.getItem('access-token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'access-token'
    )}`
  }

  return config
})

//intercept errors
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.message === 'Network Error') {
      throw Error(error.message)
    }
    throw error
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios,
}
