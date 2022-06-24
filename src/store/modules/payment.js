import { storePaypalIds } from '@/store/api/payment'

const actions = {
  storePaypalIds({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        storePaypalIds(data).then((res) => {
          commit('setPaypalOrderId', res.data.orderId)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  storePayerEmail({ commit }, data) {
    commit('setPayerEmail', data)
  },
  clearPayerEmail({ commit }) {
    commit('clearPayerEmail')
  }
}
const state = {
  payerEmail: '',
  paypalOrderId: ''
}

const mutations = {
  setPayerEmail(state, payerEmail) {
    state.payerEmail = payerEmail
  },
  clearPayerEmail(state) {
    state.payerEmail = ''
  },
  setPaypalOrderId(state, paypalOrderId) {
    state.paypalOrderId = paypalOrderId
  },
  clearPaypalOrderId(state) {
    state.paypalOrderId = ''
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
