<template>
<div class="articles-recent py-6 px-0">
  <h3 class="text-h3 primary-color pl-6">
    {{ $t("articles.ArticlesSimilar") }}
  </h3>
  <div>
    <template v-for="(item, i) in articlesList">
      <ArticleItem :key="i" :article="item" />
    </template>
  </div>
</div>
</template>

<script>
import ArticleItem from '@/components/Articles/ArticleItem'

export default {
  name: 'ArticlesSimilar',
  components: { ArticleItem },
  data() {
    return {
      limit: 5,
      articlesList: []
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
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
