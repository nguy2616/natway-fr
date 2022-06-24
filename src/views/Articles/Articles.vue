<template>
<div class=" container ">
    <ly-tab class="ly"
v-model="selectedId"
:items="items"
:options="options"
@change="change">
</ly-tab>
<div v-if="selectedId === 0 || selectedId === -1">
<a-row class="articles__banner ml-4">
        <img class="banner__img" :src="require('@/assets/image/article-banner.png')" />
        <div class="banner__cover"/>
        <a-button class="banner__category"> {{$t('articles.ArticlesSpecial')}} </a-button>
        <a-button class="banner__bookmark"> <i :class="['articles__bookmark', 'fa-bookmark', isBookMark ? 'fas' : 'far' ]" /> </a-button>
        <h2 class="banner__title" >
          {{`Retrouver le sommeil`}}
        </h2>
      </a-row>
      <!-- <div class="article-scrolls">
        <template v-for="(item, i) in articlesList">
          <ArticleItemHorizontally :key="i" :article="item" :isPlante="true" />
        </template>
      </div> -->
      <div class="pa-4">
        <ArticlesRecent />
      </div>
</div>
<div v-else-if="selectedId === 1" class="pa-4" v-for="(item, i) in saved_articles" :key="i">
        <ArticleItem :article="item"  />
      </div>
<div v-else>
    <template v-for="(item, i) in articlesList">
        <div class="pa-4" :key="i">
        <ArticleItem :article="item" />
      </div>
    </template>
</div>
  <div v-if="articlesList.length" v-observe-visibility="scrollDown"></div>
</div>

</template>

<script>
import ArticlesRecent from '@/components/Articles/ArticlesRecent.vue'
import ArticleItem from '@/components/Articles/ArticleItem'

export default {
  name: 'Articles',
  components: {
    ArticlesRecent,
    ArticleItem
  },
  data() {
    return {
      isBookMark: false,
      limit: 5,
      length: 5,
      param: '',
      selectedId: 0,
      saved_articles: [],
      items: [
        { label: this.$t('articles.Articles') },
        { label: this.$t('articles.SaveNews') },
        { label: 'Articles' },
        { label: 'A la une' },
        { label: 'Promotions' }
      ],
      options: {
        activeColor: 'none'
      }
    }
  },
  watch: {
    $route(to, from) {
      // console.log('from', from.name)
      if (from.name === 'ArticleDetails') {
        this.getArticles()
      } else if (from.name === 'Account') {
        this.selectedId = 1
        this.getArticles()
      }
    }
  },
  computed: {
    articlesList() {
      return this.$store.state.article.articlesList
    },
    categories() {
      return this.$store.state.article.categories
    }
  },
  created() {
    // this.getCategories()
    this.getArticles()
    this.change(this.items[0])
  },
  methods: {
    getCategories() {
      this.$store.dispatch('article/getCategories')
        .then(() => {
        //  console.log(this.categories)
        //  this.categories.forEach(cat => {
        //    console.log(cat.id, cat.name)
        //    this.items.push({ label: cat.name })
        //  })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getArticles() {
      // `?${this.param}&_limit=${this.limit}&_sort=average_rate:desc`
      //  _where[specialities.name]=${nextSelectedSpecialities[0].name
      this.$store.dispatch('article/getArticles', `?${this.param}&_limit=${this.limit}&_sort=published_date:desc`)
        .then(() => {
        //  console.log(this.articlesList)
          this.articlesList.forEach(article => {
            this.checkIsSaved(article)
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
    change(key) {
      if (key.label !== this.$t('articles.Articles') || key.label !== this.$t('articles.SaveNews')) {
        this.param = `_where[post_categories.name]=${key.label}`
        this.getArticles()
      } else {
        this.getArticles()
      }
    },
    checkIsSaved(article) {
      if (this.$store.state.auth.user.saved_articles) {
        if (this.$store.state.auth.user.saved_articles.some(savedp => savedp.id === article.id)) {
          article.isSaved = true
          if (!this.saved_articles.some(savedn => savedn.id === article.id)) {
            this.saved_articles.push(article)
          }
        } else {
          article.isSaved = false
          this.saved_articles = this.saved_articles.filter(function(e) {
            return e.id !== article.id
          })
        }
      }
    },
    scrollTop() {
      const container = this.$refs.container
      if (container) container.scrollTop = 0
    }
  }
}
</script>

<style>
.ly-tabbar {
    position: relative;
    background-color: #F5F5F5;
    width: 100%;
    overflow: hidden;
    display: flex;
    border-bottom:none;
    box-shadow: none;
}
.ly-tab-active-bar {
   display: none;
}
.ly-tab-item {
    color: #646464;
    font-size: 16px;
    height: 40px;
    padding: 10px 10px;
}
.ly a:hover {
    background-color: #92A65F;
    border-radius: 24px;
    color: white;
}
.ly-tab-item:not(:first-child) {
    margin-left: 0px;
}
/* .article-home {
  background: #faf8f9;
  padding-top: 24px;
}

.article-home>.ant-tabs-card>.ant-tabs-content {
  margin-top: -16px;
}

.article-home>.ant-tabs-card>.ant-tabs-content>.ant-tabs-tabpane {
  background: #faf8f9;
  padding-top: 24px;
}

.article-home>.ant-tabs-card>.ant-tabs-bar {
  border-color: #faf8f9;
}

.article-home>.ant-tabs-card>.ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.article-home>.ant-tabs-card>.ant-tabs-bar .ant-tabs-tab-active {
  border-color: #faf8f9;
  background: #faf8f9;
}

.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  font-size: 17px;
  padding: 0 24px 0 0;
}

.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
  color: #495936;
}

.ant-tabs-nav .ant-tabs-tab:hover {
  color: #495936;
}

:root .ant-tabs-tab-prev-icon-target,
:root .ant-tabs-tab-next-icon-target {
  font-size: 20px;
}

.ant-tabs-tab-btn-disabled,
.ant-tabs-tab-btn-disabled:hover {
  display: none;
} */
</style>
