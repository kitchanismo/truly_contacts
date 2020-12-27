import axios, { AxiosError, AxiosResponse } from 'axios'
import { apiUrl } from 'configs/index.json'

//intercept requests
axios.interceptors.request.use((config) => {
  config.baseURL = apiUrl

  const publicURLRoutes = ['/auth/login', 'auth/register']

  const isProtectedRoute =
    publicURLRoutes.filter((url) => url === config.url).length === 0

  if (isProtectedRoute) {
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
