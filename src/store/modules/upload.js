import { upload } from '@/store/api/upload'

const actions = {
  upload({ commit }, formData) {
    return new Promise((resolve, reject) => {
      try {
        upload(formData).then(res => {
        //  commit('setFiles', res.data)
          //  console.log(res)
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
  files: []
}
const mutations = {
  setFiles(state, files) {
    state.files = files
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
