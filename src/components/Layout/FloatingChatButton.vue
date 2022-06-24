<template>
<div class="pa-0">
    <router-link to='/chat'>
  <a-button style="height: auto; border-radius: 50%; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; border: medium none; padding: 0px; position: fixed; z-index: 99; right: 5px; bottom: 64px;box-shadow: none;" @click="showModal">
     <span class="ant-badge">
           <img contain :src="require('@/assets/image/chat.svg')" />
            <sup v-if="unreadMsg > 0" class="ant-scroll-number ant-badge-count" style="background-color: #52c41a;"> {{unreadMsg}} </sup>
          </span>
  </a-button>
  </router-link>
  <!--<a-modal v-model="visible" :footer="null" centered>
    <a-row>
      <a-col class="chatbox ">
        <a-row class="text-center">
          <div class="hello">
            <h3 type="primary">Bonjour Louis,</h3>
            <p>
              Notre réseau de naturopathes est la pour répondre a toutes vos questions. Nous faisons le maximum pour vous répondre dans le meilleurs délais
            </p>
          </div>
        </a-row>
        <a-row>
          <div class="chatted-user" v-if="isChatted === true">
            <a-row>
              <a-col>
                <a-card class="box">
                  <a-row class="input">
                    <a-input pressEnter allowClear size="large" v-model="message" placeholder="Type a message" block>
                    </a-input>
                  </a-row>
                  <a-row class="input">
                    <a-button class="text-h6" size="large" type="primary" block style="color: #D5E6BE">
                      <img contain :src="`/img/send-message.png`" class="mr-2"/>
                      {{ $i18n.t(`chat.SendMessage`) }}</a-button>
                  </a-row>
                </a-card>
              </a-col>
            </a-row>
            <a-row class="previous-chat">
              <previous-discussion />
            </a-row>
          </div>
          <div class="new-user" v-else>
            <a-row>
              <a-col>
                <a-card class="box">
                  <a-row class="input">
                    <a-input pressEnter allowClear size="large" v-model="message" :placeholder="$t('chat.AskQuestion')" block>
                    </a-input>
                  </a-row>
                  <a-row class="input">
                    <a-button class="text-h6" size="large" type="primary" block>
                      <i class="icon-send mr-2" style="font-size: 20px" />
                      {{ $i18n.t(`chat.SendMessage`) }}
                    </a-button>
                  </a-row>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-row>
      </a-col>
    </a-row>
  </a-modal>-->
</div>
</template>

<script>
// import PreviousDiscussion from '../Common/PreviousDiscussion.vue'
export default {
//  components: {
//    PreviousDiscussion
//  },
  name: 'FloatingChatButton',
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      isChatted: false,
      message: '',
      name: 'User'
    }
  },
  computed: {
    unreadMsg() {
      return this.$store.state.chat.unreadMsg
    }
  },
  mounted() {
    this.checkIsChatted()
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
    //  console.log('Clicked cancel button')
      this.visible = false
    },
    checkIsChatted() {
      if (this.$store.getters['auth/isChatted'] === false) {
        this.name = this.$store.state.auth.name
        this.isChatted = true
        // console.log(this.$store.getters['auth/isChatted'])
        // console.log(this.isChatted)
        // console.log(this.$store.state.auth.name)
      } else {
        this.name = this.$store.state.auth.name
        this.isChatted = false
        // console.log(this.$store.getters['auth/isChatted'])
        // console.log(this.isChatted)
        // console.log(this.$store.state.auth.name)
      }
    }
  }
}
</script>

<style scoped>

.input {
  margin-top: 5%;
  margin-bottom: 5%;
}

.box {
  margin-bottom: 5%;
}
.ant-scroll-number, .ant-badge-count {
    position: absolute;
    top: 20px;
    right: 20px;
}

</style>
