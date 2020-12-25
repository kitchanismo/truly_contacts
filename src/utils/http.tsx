import axios from 'axios'
import { baseUrl } from 'configs/index.json'

axios.interceptors.request.use((config) => {
  config.baseURL = baseUrl
  return config
})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios,
}
