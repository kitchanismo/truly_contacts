import axios, { AxiosError } from 'axios'
import { apiUrl } from 'configs/index.json'
import jwtDecode from 'jwt-decode'
import { getDecodeToken } from './helper'

const axiosInstance = axios.create()

//intercept requests
axiosInstance.interceptors.request.use((config) => {
  config.baseURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/api/'
      : apiUrl

  const token = localStorage.getItem('access-token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

//intercept errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.message === 'Network Error') {
      throw Error(error.message)
    }
    const originalRequest = error.config
    //refresh a token if access token expired
    if (error.response?.status === 403) {
      const refreshToken = localStorage.getItem('refresh-token')
      return axiosInstance
        .post('/auth/refresh-token', { refreshToken })
        .then(({ data }) => {
          localStorage.setItem('access-token', data.accessToken)
          return axiosInstance(originalRequest)
        })
    }
    throw error
  },
)

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  axiosInstance,
}
