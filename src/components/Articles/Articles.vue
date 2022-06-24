<template>
<div class="articles-recent py-6 px-0">
  <h3 class="primary-color pl-6 text-h3">{{ $t("articles.Articles") }}</h3>
  <div>
    <template v-for="(item, i) in articlesList">
      <ArticleItem :key="i" :article="item" />
    </template>
  </div>
  <div v-if="articlesList.length" v-observe-visibility="scrollDown"></div>
</div>
</template>

<script>
import ArticleItem from '@/components/Articles/ArticleItem'

export default {
  name: 'ArticlesRecent',
  components: {
    ArticleItem
  },
  data() {
    return {
      Articles: [],
      limit: 5,
      length: 5
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      this.$store.dispatch('article/getArticles', `?_limit=${this.limit}&_sort=published_date:desc`)
        .then(() => {
          this.articlesList = this.$store.state.article.articlesList
          console.log(this.articlesList)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    scrollDown(isVisibile) {
      if (!isVisibile) {
        if (this.length >= this.limit) {
          this.limit += 5
          this.getArticles()
        }
      }
    }
  }
}
</script>
