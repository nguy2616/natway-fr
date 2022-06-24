import { getCartItems, addItemToCart, removeItemFromCart, getOrderHistory } from '@/store/api/cart'

const actions = {
  getCartItems({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        getCartItems().then(res => {
          commit('setCartItems', res.data)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  addItemToCart({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        addItemToCart(data).then(() => {
          try {
            getCartItems().then(res => {
              commit('setCartItems', res.data)
              resolve(res)
            })
          } catch (error) {
            reject(error)
            console.log(error)
          }
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  removeItemFromCart({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        removeItemFromCart(id).then(() => {
          try {
            getCartItems().then(res => {
              commit('setCartItems', res.data)
              resolve(res)
            })
          } catch (error) {
            reject(error)
            console.log(error)
          }
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  getOrderHistory({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        getOrderHistory().then(res => {
          commit('setOrderHistory', res.data)
          resolve(res)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  clearCartItems({ commit }) {
    commit('clearCartItems')
  }
}
const state = {
  cartItems: [],
  subTotalPrice: 0,
  orderHistoryItems: [],
  totalCartQuantity: 0
}

const mutations = {
  setCartItems(state, data) {
    state.cartItems = data.basket_items
    state.subTotalPrice = data.totalPrice
    state.totalCartQuantity = data.totalQuantities
  },
  setOrderHistory(state, orderHistoryItems) {
    state.orderHistoryItems = orderHistoryItems
  },
  clearCartItems(state) {
    state.cartItems = []
    state.subTotalPrice = 0
    state.totalCartQuantity = 0
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
