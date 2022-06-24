import { getNaturopath, getNaturopathDetail, getSpecialities, addFav, postReview } from '@/store/api/naturopath'

const actions = {
  getNaturopath({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getNaturopath(param).then(res => {
          commit('setNaturopaths', res.data)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  getNaturopathDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getNaturopathDetail(id).then(res => {
          commit('setNaturopath', res.data)
          //  console.log(state.naturopath)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  getSpecialities({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        getSpecialities().then(res => {
          commit('setSpecialities', res.data)
          //  console.log(state.specialities)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  addFavNaturopath({ commit }, id) {
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
  },
  postReview({ commit }, content) {
    return new Promise((resolve, reject) => {
      try {
        postReview(content)
          .then(res => {
            console.log(res.data)
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
  naturopathsList: [],
  specialities: [],
  naturopath: null
}

const mutations = {
  setNaturopaths(state, naturopathsList) {
    state.naturopathsList = naturopathsList
  },
  setSpecialities(state, specialities) {
    state.specialities = specialities
  },
  setNaturopath(state, naturopath) {
    state.naturopath = naturopath
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
