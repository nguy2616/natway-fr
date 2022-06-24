<template>
<div class="comments pa-6 pr-0">
  <a-card style="width: 100%" :bordered="false">
    <a-list size="large">
      <a-list-item class="comment-form">
        <a-avatar :size="64" icon="user" src="" class="avatar mr-5" />
        <a-list-item-meta>
          <div slot="description">
            <a-input pressEnter allowClear size="large" v-model="message" placeholder="Type a message" style="width: calc(100% - 50px)"/>
          </div>
        </a-list-item-meta>
      </a-list-item>
      <a-list-item>
        <a-list size="large" :data-source="article.post_comments">
          <a-list-item slot="renderItem" key="item.author" slot-scope="item">
            <a-avatar :size="64" icon="user" src="" class="avatar mr-5" />
            <a-list-item-meta>
              <a slot="title" class="font-weight-bold">{{ item.author.fullName }}</a>
              <div slot="description">
                <span class="font-weight-medium" style="font-size: 12px"> <a-icon type="clock-circle" /> {{ item.published_date }}</span>
                <br />
                <vue-markdown>
                  {{ item.body }}
                </vue-markdown>
              </div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-list-item>
    </a-list>
  </a-card>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
var dayjs = require('dayjs')
dayjs().format()
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export default {
  name: 'Comments',
  components: {
    VueMarkdown
  },
  data() {
    return {
      article: this.$store.state.article.article,
      message: ''
    }
  },
  mounted() {
    // this.getDetail()
    console.log(this.article)
    this.converTime()
  },
  methods: {
    //    getDetail() {
    //      this.$store.dispatch('article/getArticleDetail', this.$route.params.id)
    //        .then(() => {
    //          this.article = this.$store.state.article.article
    //          console.log(this.$store.state.article.article)
    //        })
    //        .catch((e) => {
    //          console.log(e)
    //        })
    //    }
    converTime() {
      this.article.post_comments.forEach((comment) => {
        comment.published_date = dayjs().to(dayjs(comment.published_date))
      })
    }
  }
}
</script>
