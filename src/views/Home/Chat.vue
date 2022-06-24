<template>
  <div class="chat pa-6">
        <a-row>
            <h2 class="text-h2">Bonjour {{this.name}},</h2>
            <p>
              Notre réseau de naturopathes est la pour répondre a toutes vos questions. Nous faisons le maximum pour vous répondre dans le meilleurs délais
            </p>
        </a-row>
            <a-row class="chatbox mb-10">
              <a-col>
                  <a-row class="input my-5">
                     <a-textarea size="large" style="border-radius: 16px; border-color: #92A65F; height: 100px" :placeholder="$t('chat.AskQuestion')"></a-textarea>
                  </a-row>
                  <a-row class="text-center">
                      <a-col :span=2></a-col>
                      <a-col :span=20>
                            <a-button class="text-h6" size="large" type="primary" block>
                      <img contain :src="`/img/send-message.png`" class="mr-2"/>
                      {{ $i18n.t(`chat.SendMessage`) }}</a-button>
                      </a-col>
                  </a-row>
              </a-col>
            </a-row>
            <a-row class="previous-chat" v-if="isChatted === true">
                <h1 class="text-h1 second-dark-color mb-5">{{ $t('naturopath.RecentReviews')}}</h1>
              <previous-discussion/>
            </a-row>
  </div>
</template>

<script>
import PreviousDiscussion from '../../components/Common/PreviousDiscussion.vue'
export default {
  components: {
    PreviousDiscussion
  },
  name: 'Chat',
  data() {
    return {
      message: '',
      isChatted: false,
      name: 'User'
    }
  },
  mounted() {
    this.checkIsChatted()
  },
  methods: {
    checkIsChatted() {
      if (this.$store.getters['auth/isChatted'] === false) {
        this.name = this.$store.state.auth.name
        this.isChatted = true
        console.log(this.$store.getters['auth/isChatted'])
        console.log(this.isChatted)
        console.log(this.$store.state.auth.name)
      } else {
        this.name = this.$store.state.auth.name
        this.isChatted = false
        console.log(this.$store.getters['auth/isChatted'])
        console.log(this.isChatted)
        console.log(this.$store.state.auth.name)
      }
    }
  }
}
</script>

<style>

</style>
