import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application.json'
  }
})

export default {
  fetchProducts() {
    return apiClient.get('/products')
  },
  fetchProductById(id) {
    return apiClient.get('/products/' + id)
  }
}
