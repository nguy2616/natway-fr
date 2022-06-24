import { checkOut, getDeliveryTypes, createShippingAddress, getShippingAddresses } from '@/store/api/order'

const actions = {
  updateOrderInfo({ commit }, data) {
    commit('setOrderInfo', data)
  },
  getDeliveryTypes({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        getDeliveryTypes().then(res => {
          commit('setDeliveryTypes', res.data)
          resolve(res)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  resetOrderInfo({ commit }) {
    commit('clearOrderInfo')
  },
  checkOut({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        checkOut(data).then(res => {
          if (res.status !== 402) {
            commit('clearOrderInfo')
          }
          resolve(res)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  createShippingAddress({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createShippingAddress(data).then(res => {
          commit('setShippingAddress', res.data)
          resolve(res)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  setShippingAddress({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        commit('setShippingAddress', data)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  },
  getShippingAddresses({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        getShippingAddresses().then(res => {
          commit('setShippingAddresses', res.data)
          if (res.data.length === 0) {
            commit('clearSelectedShippingAddress')
            commit('clearShippingAddresses')
          }
          resolve(res)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  resetShippingInfo({ commit }) {
    commit('clearShippingInfo')
  }
}

const state = {
  orderInfo: [],
  deliveryTypes: [],
  shippingAddresses: [],
  selectedShippingAddress: []
}

const mutations = {
  setOrderInfo(state, data) {
    state.orderInfo = data
  },
  setDeliveryTypes(state, data) {
    state.deliveryTypes = data
  },
  setShippingAddress(state, data) {
    // selected shipping address
    state.orderInfo.shipping_address = data.id
    state.selectedShippingAddress = data
  },
  setShippingAddresses(state, data) {
    // shipping address list
    state.shippingAddresses = data
  },
  clearSelectedShippingAddress(state) {
    state.selectedShippingAddress = []
  },
  clearShippingAddresses(state) {
    state.shippingAddresses = []
  },
  clearOrderInfo(state) {
    state.orderInfo = []
  },
  clearShippingInfo(state) {
    state.selectedShippingAddress = []
    state.shippingAddresses = []
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
