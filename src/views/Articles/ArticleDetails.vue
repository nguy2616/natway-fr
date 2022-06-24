<template>
<div class="pa-0" ref="articleDetails" style="height: 100%; overflow: hidden; overflow-y: scroll">
  <div class="article-details pa-6 max-width" v-if="article">
    <h1 class="article-title text-h1" >{{ article.title }}</h1>
    <div class="mb-5" />
    <a-row class="author mb-5">
        <a-col :span=4>
            <a-avatar :size="40" icon="user" :src="article.author.image.url" />
        </a-col>
        <a-col :span=18>
            <h4 class="text-h4"> By {{ article.author.username }}</h4>
            <h4 class="text-h4 primary-color">{{ article.post_categories[0].name }}</h4>
        </a-col>
      <!--<span class="font-weight-medium ml-2" style="font-size: 12px">
        <a-icon type="clock-circle" /> {{ time }}</span>-->
    </a-row>
        <img :src="article.featured_image.url" class="max-width mb-5" style="width: 100%; border-radius: 16px" />
    <a-row class="content">
      <vue-markdown>
        {{ article.body }}
      </vue-markdown>
    </a-row>
    <a-divider class="my-1" />
    <a-row type="flex">
        <a-col :span=7>
            <span class="primary-color"><img contain :src="require('@/assets/image/share.svg')" /> Share</span>
        </a-col>
        <a-col :span=9 @click.prevent="addBookmark">
              <span v-if="isBookmark === true" class="primary-dark-color"><i class="fa-bookmark fas" /> Bookmark</span>
               <span v-else class="primary-color"><i class="fa-bookmark far" /> Bookmark</span>
        </a-col>
        <a-col :span=8>
               <span class="primary-color"><img contain :src="require('@/assets/image/comment.svg')" /> Comment</span>
        </a-col>
    </a-row>
    <template v-if="article.post_comments.length > 0">
        <a-row class="mt-8" type="flex" v-for="(comment, i) in article.post_comments" :key="i">
        <a-col :span=4>
             <a-avatar v-if="comment.author.image" :size="40" icon="user" :src="comment.author.image.url" />
             <a-avatar v-else :size="40" icon="user"></a-avatar>
        </a-col>
        <a-col :span=20>
            <span> <vue-markdown>
                  {{ comment.body }}
                </vue-markdown></span>
        </a-col>
    </a-row>
    </template>
     <a-divider class="my-1" />
     <a-modal v-model="visible" okText="Login" @ok="handleOk">
         <p> In order to put comment, please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> </p>
    </a-modal>
    <a-row class="mt-8" type="flex">
        <a-col :span=4>
             <a-avatar v-if="this.$store.state.auth.user && this.$store.state.auth.user.image" :size="40" icon="user" :src="this.$store.state.auth.user.image.url" />
             <a-avatar  v-else :size="40" icon="user"></a-avatar>
        </a-col>
        <a-col :span=20>
            <a-input allowClear v-model="comment" size="large" style="border-radius: 16px; border-color: #92A65F" :placeholder="$t('articles.placeholder.comment')">
                <i slot="suffix" class="fal fa-paper-plane" style="font-size: 20; color: #4A5A36;" @click.prevent="postComment" />
      </a-input>
        </a-col>
    </a-row>
  </div>
   <!--<a-divider class="my-1" />-->
    <!--<ArticlesSimilar />-->
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
// import ArticlesSimilar from '../../components/Articles/ArticlesSimilar.vue'
var dayjs = require('dayjs')
dayjs().format()
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default {
  components: {
    VueMarkdown
    // ArticlesSimilar
  },
  name: 'ArticleDetails',
  data() {
    return {
      article: null,
      time: '',
      comment: '',
      visible: false,
      isBookmark: null
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    this.getDetail()
    console.log(this.$store.state.auth.user)
  },
  watch: {
    $route(to, from) {
      if (from.params.id !== to.params.id) {
        this.$refs.articleDetails.scrollTop = 0
        this.getDetail()
      }
    }
  },
  methods: {
    getDetail() {
      this.carouselImgs = []
      this.$store.dispatch('article/getArticleDetail', this.$route.params.id)
        .then((article) => {
          this.article = article.data
          this.checkIsBookmark(this.article)
          console.log(this.article)
          this.time = dayjs().to(dayjs(article.data.published_date))
        })
        .catch((e) => {
          console.log(e)
        })
    },
    postComment() {
      if (this.$store.state.auth.jwt) {
        const data = { author: this.$store.state.auth.user, body: this.comment }
        this.$store.dispatch('article/postComment', data)
          .then(res => {
            this.article.post_comments.push(res.data)
            console.log(this.article.post_comments)
            const dataForm = { id: this.article.id, post_comments: this.article.post_comments }
            this.$store.dispatch('article/updateArticle', dataForm)
              .then(() => {
                this.$message.success('Comment added succesfully!', 2)
              })
              .catch(er => {
                console.log(er)
              })
          })
        this.comment = ''
      } else {
        this.visible = true
      }
    },
    showModal() {
      this.visible = true
    },
    handleOk() {
      this.visible = false
      this.$router.push('/signup-email')
    },
    addBookmark() {
      if (this.$store.state.auth.jwt) {
        if (this.isBookmark !== true) {
          this.user.saved_articles.push(this.article)
          const dataForm = { id: this.user.id, saved_articles: this.user.saved_articles }
          this.$store.dispatch('auth/updateProfile', dataForm)
            .then(res => {
              this.user.saved_articles = res.data.saved_articles
              this.checkIsBookmark(this.article)
              this.$message.success('Added to Bookmark!')
              console.log(this.user.saved_articles)
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          this.user.saved_articles = this.user.saved_articles.filter(article => article.id !== this.article.id)
          const dataForm = { id: this.user.id, saved_articles: this.user.saved_articles }
          this.$store.dispatch('auth/updateProfile', dataForm)
            .then(() => {
              this.checkIsBookmark(this.article)
              this.$message.success('Removed from Bookmark!', 2)
              console.log(this.user.saved_articles)
            })
            .catch(e => {
              console.log(e)
            })
        }
      } else {
        this.visible = true
      }
    },
    checkIsBookmark(article) {
      if (this.user.saved_articles) {
        if (this.user.saved_articles.some(savedarticle => savedarticle.id === article.id)) {
          this.isBookmark = true
        } else {
          this.isBookmark = false
        }
      }
    }
  }
}
</script>
