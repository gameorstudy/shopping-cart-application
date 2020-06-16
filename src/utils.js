export function saveStatePlugin(store) {
  /* Powerful */

  store.subscribe((mutation, state) => {
    localStorage.setItem('cart', JSON.stringify(state.cart.cart))
  })
}
