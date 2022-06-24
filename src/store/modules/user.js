import { updateProfile } from '@/store/api/user'
const actions = {
// update profile after sign up
  updateProfile({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateProfile(dataForm)
          .then(res => {
            console.log(res)
            resolve(res)
          })
      } catch (error) {
        reject(error)
        console.log(error)
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
