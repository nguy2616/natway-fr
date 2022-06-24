import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import account from './modules/account'
import setting from './modules/setting'
import auth from './modules/auth'
import user from './modules/user'
import naturopath from './modules/naturopath'
import remedy from './modules/remedy'
import product from './modules/product'
import article from './modules/article'
import search from './modules/search'
import upload from './modules/upload'
import hereAPI from './modules/hereAPI'
import schools from './modules/schools'
import cart from './modules/cart'
import order from './modules/order'
import payment from './modules/payment'
import stripe from './modules/stripe'
import paypal from './modules/paypal'
import chat from './modules/chat'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    account,
    setting,
    auth,
    user,
    naturopath,
    remedy,
    article,
    product,
    search,
    upload,
    hereAPI,
    schools,
    cart,
    order,
    payment,
    stripe,
    paypal,
    chat
  },
  plugins: [createPersistedState()]
})
