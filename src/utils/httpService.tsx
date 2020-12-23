import axios from 'axios'

axios.interceptors.request.use((config) => {
  config.baseURL = 'https://truly-contacts.herokuapp.com/api/'
  return config
})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios,
}
