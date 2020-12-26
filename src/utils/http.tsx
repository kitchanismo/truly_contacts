import axios from 'axios'
import { apiUrl } from 'configs/index.json'

axios.interceptors.request.use((config) => {
  config.baseURL = apiUrl
  return config
})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios,
}
