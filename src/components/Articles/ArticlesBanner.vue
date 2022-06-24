<template>
<!-- autoplay -->
<a-carousel >
  <div v-for="banner in articlesList" :key="banner.id">
    <a-row class="articles__banner ma-4">
      <img class="banner__img" :src="banner.featured_image.url" />
      <div class="banner__cover" />
      <a-button class="banner__category"> {{banner.post_categories[0].name}} </a-button>
      <a-button class="banner__bookmark"> <i :class="['articles__bookmark', 'fa-bookmark', isBookMark ? 'fas' : 'far' ]" /> </a-button>
      <h2 class="banner__title">
        {{banner.title}}
      </h2>
    </a-row>
  </div>
</a-carousel>
</template>

<script>
export default {
  name: 'ArticlesBanner',
  data() {
    return {
      isBookMark: false,
      articlesList: [],
      limit: 4,
      length: 4
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      this.$store.dispatch('article/getArticles', `?_where[post_categories.name]=A la une&_limit=${this.limit}&_sort=published_date:desc`)
        .then((res) => {
          this.articlesList = res.data
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
