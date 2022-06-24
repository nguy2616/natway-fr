import { getSchools, postSchool } from '../api/school'

const actions = {
  getSchools({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        getSchools().then(res => {
          commit('setSchools', res.data)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  postSchool({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        postSchool(data).then(res => {
          commit('setNewSchool', res.data)
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
  schools: [],
  newSchool: null
}

const mutations = {
  setSchools(state, schools) {
    state.schools = schools
  },
  setNewSchool(state, school) {
    state.newSchool = school
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
