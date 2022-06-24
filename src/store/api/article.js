import axios from '@/utils/request'

export function getArticles(param) {
  return axios.get(`/posts${param}`)
}

export function getArticleDetail(id) {
  return axios.get(`/posts/${id}`)
}

export function getCategories() {
  return axios.get('/post-categories')
}

export function updateArticle(article) {
  return axios.put(`/posts/${article.id}`, article)
}

export function postComment(content) {
  return axios.post('/post-comments', content)
}
