import axios, { AxiosError } from 'axios'
import { apiUrlProd, apiUrlDev } from 'configs/index.json'
import createAuthRefreshInterceptor, {
  AxiosAuthRefreshOptions,
} from 'axios-auth-refresh'
import jwtDecode from 'jwt-decode'
import { getDecodeToken } from './helper'

//const axiosInstance = axios.create()

//intercept requests
axios.interceptors.request.use((config) => {
  config.baseURL =
    process.env.NODE_ENV === 'development' ? apiUrlDev : apiUrlProd

  const token = localStorage.getItem('access-token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

//intercept errors
// axios.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.message === 'Network Error') {
//       throw Error(error.message)
//     }
//     const originalRequest = error.config
//     //refresh a token if access token expired
//     if (error.response?.status === 403) {
//       const refreshToken = localStorage.getItem('refresh-token')
//       return axios
//         .post('/auth/refresh-token', { refreshToken })
//         .then(({ data }) => {
//           localStorage.setItem('access-token', data.accessToken)
//           return axios(originalRequest)
//         })
//     }
//     throw error
//   },
// )

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.message === 'Network Error') {
      throw Error(error.message)
    }

    throw error
  },
)

createAuthRefreshInterceptor(
  axios,
  (failedRequest) => {
    console.log('sdsd')
    const refreshToken = localStorage.getItem('refresh-token')
    return axios
      .post('/auth/refresh-token', { refreshToken })
      .then(({ data }) => {
        localStorage.setItem('access-token', data.accessToken)
        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + data.accessToken
        return Promise.resolve()
      })
  },
  {
    statusCodes: [403],
    pauseInstanceWhileRefreshing: true,
  },
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios,
}
