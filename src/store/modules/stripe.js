import { getCardsList } from '@/store/api/stripe'

const actions = {
  getCardsList({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        getCardsList().then(res => {
          commit('setCardsList', res.data)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  clearCardsList({ commit }) {
    commit('clearCardsList')
  },
  setPaymentMethodId({ commit }, stripePaymentMethodId) {
    commit('setPaymentMethodId', stripePaymentMethodId)
  },
  clearPaymentMethodId({ commit }) {
    commit('clearPaymentMethodId')
  }
}
const state = {
  cardsList: [],
  stripePaymentMethodId: ''
}

const mutations = {
  setCardsList(state, cardsList) {
    state.cardsList = cardsList
  },
  clearCardsList(state) {
    state.cardsList = []
  },
  setPaymentMethodId(state, stripePaymentMethodId) {
    state.stripePaymentMethodId = stripePaymentMethodId
  },
  clearPaymentMethodId(state) {
    state.stripePaymentMethodId = ''
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
