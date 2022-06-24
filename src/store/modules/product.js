import { getProducts, getProductDetail, getReviews, addFav } from '@/store/api/product'

const actions = {
  getProducts({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getProducts(param).then(res => {
          commit('setProducts', res.data)
          //  console.log(state.productsList)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  getProductDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getProductDetail(id).then(res => {
          commit('setProduct', res.data)
          //  console.log(state.Product)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  getReviews({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        getReviews().then(res => {
          commit('setReviews', res.data)
          //  console.log(state.Reviews)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        // console.log(error)
      }
    })
  },
  addFavProduct({ commit }, id) {
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
  productsList: [],
  reviews: [],
  product: null
}

const mutations = {
  setProducts(state, productsList) {
    state.productsList = productsList
  },
  setReviews(state, reviews) {
    state.reviews = reviews
  },
  setProduct(state, product) {
    state.product = product
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
