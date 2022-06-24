import { createOrder } from '@/store/api/paypal'

const actions = {
  createOrder({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        createOrder(data).then(res => {
          // commit('setCardsList', res.data)
          resolve(res)
        })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}
const state = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
