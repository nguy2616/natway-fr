<template>
<div class="articles pr-0">
  <a-card style="width: 100%" :bordered="false">
    <a-list size="large" :data-source="articlesList">
      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <img width="30%" :src="item.featured_image.url" alt="Article image" class="img mr-5" />
        <a-list-item-meta>
          <router-link slot="title" :to="{ name: 'ArticleDetails', params: { id: item.id } }">
            <h3 class="title">{{ item.title }}</h3>
          </router-link>
          <div slot="description">
            <div class="content">
              <vue-markdown>
                {{ item.body }}
              </vue-markdown>
            </div>
            <span class="font-weight-medium" style="font-size: 12px">
              <a-icon style="color: darkcyan;" type="clock-circle" /> {{item.published_date}}</span>
          </div>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-card>
  <div v-if="articlesList.length" v-observe-visibility="scrollDown"></div>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'Articles',
  data() {
    return {
      articlesList: [],
      limit: 5,
      length: 5
    }
  },
  components: {
    VueMarkdown
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      this.$store.dispatch('article/getArticles', `?_limit=${this.limit}&_sort=published_date:desc`)
        .then(() => {
          this.articlesList = this.$store.state.article.articlesList
          //  console.log(this.$store.state.remedy.remediesList)
          this.length = this.articlesList.length
        //  console.log(this.length)
        //  console.log(this.limit)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    scrollDown(isVisibile) {
      if (!isVisibile) {
        if (this.length >= this.limit) {
        //  console.log('a')
          this.limit += 5
          this.getArticles()
        }
      }
    }
  }
}
</script>

<style scoped>
.title {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.content {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
