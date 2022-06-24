<template>
<a-card hoverable :bordered="false" class="article__item" @click="(e)=> { $router.push({ name: `ArticleDetails`, params: { id: article.id, title: article.name } }) }">
  <a-row>
    <a-col>
      <img class="article__img" :src="article.featured_image.url" :alt="article.title" />
    </a-col>
    <a-col>
        <a-row type="flex">
            <a-col :span=20>
                <template v-for="(cat, i) in article.post_categories">
          <a-button class="article__category mr-1" :key="i">{{cat.name}}</a-button>
      </template>
            </a-col>
            <a-col :span=4>
                 <a-button @click.stop="saveArticle(article)" class="banner__bookmark"> <i :class="['articles__bookmark', 'fa-bookmark', article.isSaved === true ? 'fas' : 'far' ]" /> </a-button>
            </a-col>
        </a-row>
      <h3 class="article__title">{{article.title}}</h3>
      <span class="article__author">{{article.author.fullName}}</span>
    </a-col>
  </a-row>
   <a-modal v-model="visible" okText="Login" @ok="handleOk">
         <p> Please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> to continue!!!  </p>
    </a-modal>
</a-card>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: ['article'],
  data() {
    return {
      visible: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    handleOk() {
      this.visible = false
      this.$router.push('/signup-email')
    },
    saveArticle(article) {
      if (this.$store.state.auth.jwt) {
        if (article.isSaved === true) {
          this.user.saved_articles = this.user.saved_articles.filter(rmd => rmd.id !== article.id)
          const dataForm = { id: this.user.id, saved_articles: this.user.saved_articles }
          this.$store.dispatch('auth/updateProfile', dataForm)
            .then(res => {
              this.user.saved_articles = res.data.saved_articles
              this.checkIsSaved(article)
              this.$message.success('Removed from saved list!', 2)
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          this.user.saved_articles.push(article)
          const dataForm = { id: this.user.id, saved_articles: this.user.saved_articles }
          this.$store.dispatch('auth/updateProfile', dataForm)
            .then(res => {
              this.user.saved_articles = res.data.saved_articles
              this.checkIsSaved(article)
              this.$message.success('Added to saved list!', 2)
            })
            .catch(e => {
              console.log(e)
            })
        }
      } else {
        this.visible = true
      }
    },
    checkIsSaved(article) {
      if (this.user.saved_articles) {
        if (this.user.saved_articles.some(favarticle => favarticle.id === article.id)) {
          article.isSaved = true
        } else {
          article.isSaved = false
        }
      }
    }
  }
}
</script>
