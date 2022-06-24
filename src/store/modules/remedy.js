import { getRemedies, getRemedyDetail, getCategories, addFav } from '@/store/api/remedy'

const actions = {
  getRemedies({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getRemedies(param).then(res => {
          commit('setRemedies', res.data)
          //  console.log(state.remediesList)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  getRemedyDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getRemedyDetail(id).then(res => {
          commit('setRemedy', res.data)
          resolve(res.data)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  getCategories({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        getCategories().then(res => {
          commit('setCategories', res.data)
          //  console.log(state.categories)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        // console.log(error)
      }
    })
  },
  addFavRemedy({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        addFav(id).then(res => {
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  }
}
const state = {
  remediesList: [],
  categories: [],
  remedy: null
}

const mutations = {
  setRemedies(state, remediesList) {
    state.remediesList = remediesList
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setRemedy(state, remedy) {
    state.remedy = remedy
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
