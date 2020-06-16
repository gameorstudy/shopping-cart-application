export const namespaced = true

export const state = {
  cart: JSON.parse(localStorage.getItem('cart')) || []
}

export const mutations = {
  ADD_PRODUCT(state, item) {
    state.cart.push(item)
  },
  CHANGE_MODE(state, id) {
    state.cart.forEach(item => {
      if (id === item.id) {
        item.checked = !item.checked
      }
    })
  },
  REDUCE_BY_ONE(state, id) {
    state.cart.forEach(item => {
      if (id === item.id) {
        item.amount -= 1
      }
    })
  },
  INCREASE_BY_ONE(state, id) {
    state.cart.forEach(item => {
      if (id === item.id) {
        item.amount += 1
      }
    })
  },
  CHANGE_ALL_MODE(state, active) {
    state.cart.forEach(item => {
      item.checked = !active
    })
  },
  REMOVE_ALL_ITEMS(state) {
    state.cart = state.cart.filter(item => !item.checked)
  }
}

export const actions = {
  addToCart({ commit }, item) {
    return commit('ADD_PRODUCT', item)
  },
  checkOrNot({ commit }, id) {
    commit('CHANGE_MODE', id)
  },
  reduceByOne({ commit }, id) {
    commit('REDUCE_BY_ONE', id)
  },
  increaseByOne({ commit }, id) {
    commit('INCREASE_BY_ONE', id)
  },
  changeAllMode({ commit }, active) {
    commit('CHANGE_ALL_MODE', active)
  },
  removeCheckedItems({ commit }) {
    return commit('REMOVE_ALL_ITEMS')
  }
}

export const getters = {
  lengthOfItems: state => {
    return state.cart.length
  },
  totalAmount: state => {
    let totalAmount = 0
    state.cart.forEach(item => {
      if (item.checked) totalAmount += item.price * item.amount
    })

    return totalAmount ? totalAmount.toFixed(2) : 0
  },
  isCheckedAll: state => {
    let active = true

    for (const item of state.cart) {
      if (!item.checked) {
        active = false
        break
      }
    }
    return active
  },
  isCheckedNone: state => {
    let active = true

    for (const item of state.cart) {
      if (item.checked) {
        active = false
        break
      }
    }
    return active
  },
  isInCart: state => id => {
    let item = state.cart.find(item => id === item.id)
    return item ? true : false
  }
}
