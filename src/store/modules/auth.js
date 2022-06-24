import { login, signup, signupWithProvider, getCharterContents, getPrecautionContents, checkEmail, forgotPassword, resetPassword } from '@/store/api/auth'
import { setToken, removeToken, getFullName } from '@/utils/auth'
import { updateProfile, deleteAccount } from '@/store/api/user'
import { upload } from '@/store/api/upload'
// import { _ } from 'core-js'
// Optimize Natsuho '_' is defined but never used. Please comment or remove if not used

const state = {
  name: 'User',
  user: null,
  jwt: null,
  isChatted: false,
  role: null,
  action: null,
  precaution_contents: [],
  files: [],
  ncUser: null,
  rfUser: null,
  ncNaturo: null,
  rfNaturo: null,
  provider: null
}

const mutations = {
  set_provider(state, provider) {
    state.provider = provider
  },
  set_isChatted(state, isChatted) {
    state.isChatted = isChatted
  },
  set_Name(state, name) {
    state.name = name
  },
  set_User(state, user) {
    state.user = user
  },
  set_Token(state, jwt) {
    state.jwt = jwt
  },
  set_Role(state, role) {
    state.role = role
  },
  set_Action(state, action) {
    state.action = action
  },
  set_ncUser(state, contents) {
    state.ncUser = contents
  },
  set_rfUser(state, contents) {
    state.rfUser = contents
  },
  set_ncNaturo(state, contents) {
    state.ncNaturo = contents
  },
  set_rfNaturo(state, contents) {
    state.rfNaturo = contents
  },
  set_Precaution(state, contents) {
    state.precaution_contents = contents
  },
  setFiles(state, files) {
    state.files = files
  }
}

const actions = {
  // sign up
  signup({ commit }, signupInfo) {
    return new Promise((resolve, reject) => {
      try {
        signup(signupInfo)
          .then(res => {
            commit('set_Token', res.data.jwt)
            commit('set_User', res.data.user)
            commit('set_Name', getFullName(res.data.user))
            setToken(res.data.jwt)
            resolve(res)
          })
          .catch(error => {
            reject(error.message)
          })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  // sign up with Provider
  signupWithProvider({ commit }, data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      try {
        signupWithProvider(data.provider, data.param)
          .then(res => {
            commit('set_provider', data.provider)
            commit('set_Token', res.data.jwt)
            commit('set_User', res.data.user)
            commit('set_Name', getFullName(res.data.user))
            setToken(res.data.jwt)
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            // this.$message.error(this.$i18n.t('auth.AccountExist'))
            reject(error)
          })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  login({ commit }, loginInfo) {
    const { identifier, password } = loginInfo
    return new Promise((resolve, reject) => {
      try {
        login({ identifier: identifier.trim(), password: password })
          .then(res => {
            commit('set_Token', res.data.jwt)
            commit('set_User', res.data.user)
            commit('set_isChatted', res.data.user.isChatted)
            commit('set_Name', getFullName(res.data.user))
            // commit('set_Name', res.data.user.firstName)
            setToken(res.data.jwt)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  },
  logout({ commit }) {
    localStorage.removeItem('vuex')
    commit('set_User', null)
    commit('set_Name', 'User')
    commit('set_Token', null)
    commit('set_Role', null)
    commit('set_Action', null)
    commit('set_Precaution', [])
    // commit('set_Charter', '')
    removeToken()
  },
  updateProfile({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateProfile(dataForm)
          .then(res => {
            commit('set_User', res.data)
            resolve(res)
          })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  upload({ commit }, formData) {
    return new Promise((resolve, reject) => {
      try {
        upload(formData).then(res => {
          commit('setFiles', res.data[0])
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  setRole({ commit }, role) {
    commit('set_Role', role)
  },
  setAction({ commit }, action) {
    commit('set_Action', action)
  },
  getCharterContents({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getCharterContents(param)
          .then(res => {
            if (param === 1) {
              commit('set_ncUser', res.data.content)
            } else if (param === 2) {
              commit('set_ncNaturo', res.data.content)
            } else if (param === 3) {
              commit('set_rfUser', res.data.content)
            } else {
              commit('set_rfNaturo', res.data.content)
            }

            resolve(res)
          })
          .catch(error => {
            reject(error.message)
          })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  getPrecautionContents({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        getPrecautionContents()
          .then(res => {
            commit('set_Precaution', res.data)
            resolve(res)
          })
          .catch(error => {
            reject(error.message)
          })
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  checkEmail({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        checkEmail(data)
          .then(res => {
            commit('set_provider', res.data.provider)
            resolve(res)
          })
          .catch(error => {
            reject(error.message)
          })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  forgotPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        forgotPassword(data)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error.message)
          })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  resetPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        resetPassword(data)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            console.log(error)
            reject(error.message)
          })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  deleteAccount({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        deleteAccount(id).then(res => {
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  }
}
const getters = {
  isLoggedIn(state) {
    if (state.jwt == null || !state.jwt) {
      return false
    } else {
      return true
    }
  },
  isChatted(state) {
    if (state.isChatted === null || state.isChatted === false) {
      return false
    } else {
      return true
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
