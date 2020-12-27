import axios, { AxiosError, AxiosResponse } from 'axios'
import { apiUrl } from 'configs/index.json'

axios.interceptors.request.use((config) => {
  config.baseURL = apiUrl
  return config
})

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('x', response.status)
    return response
  },

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
