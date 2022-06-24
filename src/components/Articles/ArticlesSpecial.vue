<template>
<div class="article-latest">
  <a-row type="flex" justify="space-between" align="bottom" class="mb-4 ml-4">
    <h2 class="float-left second-dark-color text-h2 row-2 mb-0" style="width: 195px">
      {{ $t("articles.ArticlesSpecial") }}
    </h2>
    <a-button class="float-right" type="link" @click=" (e) => { $router.push('/articles') } ">{{ $t("ViewAll") }}</a-button>
  </a-row>
  <div class="article-scrolls">
    <template v-for="(item, i) in articlesList">
      <ArticleItemHorizontally :key="i" :article="item" :isPlante="true" />
    </template>
  </div>
</div>
</template>

<script>
import ArticleItemHorizontally from '@/components/Articles/ArticleItemHorizontally'
export default {
  name: 'ArticlesSpecial',
  components: { ArticleItemHorizontally },
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
        //  console.log(this.articlesList)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
