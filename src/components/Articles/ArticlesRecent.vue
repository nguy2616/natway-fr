<template>
<div class="articles__recent">
  <a-row type="flex" justify="space-between" align="bottom" class="mb-4">
    <h2 class="float-left second-dark-color text-h2 row-2 mb-0" >
      {{ $t("articles.ArticlesRecent") }}
    </h2>
  </a-row>
  <div>
    <div class="article-list">
      <template v-for="(item, i) in articlesList">
        <ArticleItem :key="i" :article="item" />
      </template>
    </div>
  </div>
  <div v-if="articlesList.length" v-observe-visibility="scrollDown"></div>
</div>
</template>

<script>
import ArticleItem from '@/components/Articles/ArticleItem'

export default {
  name: 'ArticlesRecent',
  components: { ArticleItem },
  data() {
    return {
      articlesList: [],
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
          this.articlesList.forEach(art => {
            this.checkIsSaved(art)
          })
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
    },
    checkIsSaved(article) {
      if (this.$store.state.auth.user.saved_articles) {
        if (this.$store.state.auth.user.saved_articles.some(savedp => savedp.id === article.id)) {
          article.isSaved = true
        } else {
          article.isSaved = false
        }
      }
    }
  }
}
</script>
