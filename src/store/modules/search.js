import { searchAll } from '@/store/api/search'
const actions = {
  searchAll({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        searchAll(`?searchValue=${param}`).then(res => {
          commit('setResults', res.data)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  clearResult({ commit }) {
    commit('setResults', [])
  }
}
const state = {
  searchResults: []
}
const mutations = {
  setResults(state, searchResults) {
    state.searchResults = searchResults
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
