import { hereAPIURL, hereAPIAppId, hereAPIAppCode } from '@/utils/constant'

const state = {
  access_token: null,
  postal_code_options: [],
  selected_item: null
}

const mutations = {
  set_Token(state, accessToken) {
    state.access_token = accessToken
  },
  set_PostalCodeOptions(state, postalCodeOptions) {
    state.postal_code_options = postalCodeOptions
  },
  set_SelectedOption(state, selectedOption) {
    state.selected_item = selectedOption
  }
}

const actions = {
  async getOptions({ commit }, queryTest) {
    const maxresults = 15
    const country = 'FRA'
    const URL = hereAPIURL + `?app_id=${hereAPIAppId}&app_code=${hereAPIAppCode}&query=${queryTest}&country=${country}&maxresults=${maxresults}`

    try {
      fetch(URL)
        .then(response => response.json())
        .then(data => {
          if (data) {
            const suggestions = data.suggestions.filter(option => option.address && option.address.postalCode)
            commit('set_PostalCodeOptions', suggestions)
          }
        })
    } catch (error) {
      console.log(error)
    }
  },
  setSelectedOption({ commit }, data) {
    commit('set_SelectedOption', data)
  },
  resetSelectedOption({ commit }) {
    commit('set_SelectedOption', null)
  },
  resetOptions({ commit }) {
    commit('set_PostalCodeOptions', [])
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
