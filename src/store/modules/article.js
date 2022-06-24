import { getArticles, getArticleDetail, getCategories, updateArticle, postComment } from '@/store/api/article'

const actions = {
  getArticles({ commit }, param) {
    return new Promise((resolve, reject) => {
      try {
        getArticles(param).then(res => {
          commit('setArticles', res.data)
          //  console.log(state.articlesList)
          resolve(res)
        })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  postComment({ commit }, content) {
    return new Promise((resolve, reject) => {
      try {
        postComment(content)
          .then(res => {
            resolve(res)
          })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  updateArticle({ commit }, dataForm) {
    return new Promise((resolve, reject) => {
      try {
        updateArticle(dataForm)
          .then(res => {
            resolve(res)
          })
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  getArticleDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      try {
        getArticleDetail(id).then(res => {
          commit('setArticle', res.data)
          //  console.log(state.article)
          resolve(res)
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
          resolve(res)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
const state = {
  categories: [],
  articlesList: [],
  article: null
}

const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
  setArticles(state, articlesList) {
    state.articlesList = articlesList
  },
  setArticle(state, article) {
    state.article = article
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
