import Vue from 'vue'
import Vuex from 'vuex'
import { saveStatePlugin } from '@/utils.js'
import * as products from './modules/products.js'
import * as cart from './modules/shoppingcart.js'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  modules: {
    products,
    cart
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})
