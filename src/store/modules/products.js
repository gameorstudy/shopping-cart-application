import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  products: [],
  product: {}
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  }
}

export const actions = {
  fetchProducts({ commit }) {
    EventService.fetchProducts()
      .then(response => {
        commit('SET_PRODUCTS', response.data)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  fetchProductById({
    commit,
    getters
  }, id) {
    const product = getters.getProductById(id)

    if (product) {
      return commit('SET_PRODUCT', product)
    } else {
      return EventService.fetchProductById(id).then(response => {
        commit('SET_PRODUCT', response.data)
      })
    }
  }
}

export const getters = {
  getProductById: state => id => {
    state.products.find(product => id === product.id)
  }
}
