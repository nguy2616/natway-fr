<template>
<div class="messages">
  <div class="messages-list-container" @click="focus2">
    <div class="px-6 messages-list" type="flex" ref="containerChat" >
      <!-- <div class="messages-list" type="flex" ref="containerChat" v-bind="scrollToEnd()" > -->
      <a-row type="flex" justify="center" align="middle" v-if="spinning" >
        <a-spin :spinning="spinning" class="ma-1" size="small" />
        <a-spin :spinning="spinning" class="ma-1"/>
        <a-spin :spinning="spinning" class=" ma-1" size="large" />
      </a-row>
      <template v-for="(message, i) in messageList">
        <MessageContent :messageGroup="message" :key="i" />
      </template>
      <!--<a-icon v-if="down === true"
      @click.prevent="scrollToEnd" style="position: fixed; z-index: 99; right: 10px; bottom: 100px; font-size: 20px; color: #4A5A36;" type="down-circle"/>-->
    </div>
  </div>
  <a-layout-footer class="message-input pa-4">
    <a-form-model @submit="handleSendMessage">
      <a-row type="flex" align="middle">
        <a-col :span="3">
          <img contain :src="require('@/assets/image/chat/image.svg')" />
        </a-col>
         <a-col :span="3">
            <img contain :src="require('@/assets/image/chat/store.svg')" />
         </a-col>
        <a-col :span="18" v-if="touch === false" @click="focus">
          <a-input allow-clear :autoSize="{ minRows: 2, maxRows: 4 }" class="textarea ma-0" pressEnter ref="inputMessage" autocomplete="off" v-model="inputMessage" />
        </a-col>
        <a-col :span="15" v-else>
          <a-row type="flex" justify="space-between" align="middle">
            <a-col :span="22">
               <a-input allow-clear :autoSize="{ minRows: 2, maxRows: 4 }" class="textarea ma-0" pressEnter ref="inputMessage" autocomplete="off" v-model="inputMessage" />
            </a-col>
             <a-col :span="2">
                <a-button type="link" @click="handleSendMessage">
            <a-icon v-if="iconLoading" type="loading" style="font-size: 28px; color: #4A5A36;" />
            <i v-else class="fal fa-paper-plane" style="font-size: 28px; color: #4A5A36;" />
          </a-button>
             </a-col>
          </a-row>
        </a-col>
        <!--<a-col :span="2">
          <a-button class="text-h6" type="link" @click="handleSendMessage">
            <a-icon v-if="iconLoading" type="loading" style="font-size: 28px; color: #4A5A36;" />
            <i v-else class="fal fa-paper-plane" style="font-size: 28px; color: #4A5A36;" />
          </a-button>
        </a-col>-->
      </a-row>
    </a-form-model>
  </a-layout-footer>
</div>
</template>

<script>
import MessageContent from '@/components/Chat/MessageContent'
import { SendBirdAction } from '@/store/api/SendBird/SendBirdAction'
import { SendBirdChatEvent } from '@/store/api/SendBird/SendBirdChatEvent'
// import { SendBirdEvent } from '@/store/api/SendBird/SendBirdEvent'
// const sendbirdAction = SendBirdAction.getInstance()

export default {
  name: 'Messages',
  components: { MessageContent },
  data() {
    return {
      messageList: [],
      channel: '',
      channelUrl: '',
      inputMessage: '',
      iconLoading: false,
      spinning: true,
      touch: false,
      style: {
        height: '100%',
        width: '100%'
      }
    }
  },
  mounted() {
    // console.log('mounted $route', this.$route)
    console.log(this.$route.params.img)
    if (this.$route.params && this.$route.params.channel && this.$route.params.channel.url) {
      this.getMessageList(this.$route.params.channel.url)
      this.channelUrl = this.$route.params.channel.url
      this.channel = this.$route.params.channel
    }
    if (this.$route.params && this.$route.params.selectedUserId) {
      this._createChannel(this.$route.params.selectedUserId)
    }
  },
  updated() {
    history.scrollRestoration = 'manual'
    this.scrollToEnd()
  },
  watch: {
    '$route'(to, from) {
      // console.log('watch $route', to)
      this.spinning = true
      this.messageList = []
      // this.down = false
      if (to.params && to.params.channel && to.params.channel.url) {
        this.getMessageList(to.params.channel.url)
        this.channelUrl = to.params.channel.url
        this.channel = to.params.channel
      }
      if (this.$route.params && this.$route.params.selectedUserId) {
        this._createChannel(this.$route.params.selectedUserId)
      }
    }

  },
  methods: {
    focus() {
      this.touch = true
    },
    focus2() {
      this.touch = false
    },

    _createChannel() {
    //  console.log('[this.$route.params.selectedUserId]', this.$route.params.selectedUserId)
      SendBirdAction.getInstance()
        .createGroupChannel([encodeURIComponent(this.$route.params.selectedUserId), SendBirdAction.getInstance().getCurrentUser().userId])
        .then(channel => {
          this.channelUrl = channel.url
          this.channel = channel
          this.spinning = false
          this.getGroupChannelList()
        })
        .catch(error => {
          this.spinning = false
          console.log('[_createChannel error]', error.message)
        })
    },
    handleSendMessage(e) {
      e.preventDefault()
      const message = this.inputMessage
      this.inputMessage = ''
      if (message) {
        // const tempMessage =
        SendBirdAction.getInstance().sendUserMessage({
          channel: this.channel,
          message,
          handler: (message, error) => {
            error
              ? console.log('handler error', error)
              : this.getMessageList(this.channelUrl)
              // this.renderMessages([message])
              // this.messageList = this.messageList.concat(messageList)
          }
        })
        // this.renderMessages([tempMessage])
        // this.messageList = this.messageList.concat(messageList)
        // console.log('tempMessage', tempMessage)
      }
    },
    getMessageList(channelUrl, isOpenChannel = false) {
      const sendbirdAction = SendBirdAction.getInstance()
      sendbirdAction
        .getChannel(channelUrl, isOpenChannel)
        .then(channel => {
          this.channelUrl = channel.url
          this.channel = channel
          // console.log('[getChannel]', channel)
          this._addEventHandler()
          sendbirdAction
            .getMessageList(this.channel, true)
            .then(messageList => {
              this.spinning = false
              this.messageList = messageList
              // console.log(this.messageList[0])
              this.renderMessages(messageList)
              if (this.channel.isGroupChannel()) {
                sendbirdAction.markAsRead(this.channel)
              }
            })
            .catch(error => {
              this.spinning = false
              console.log('[getMessageList error]', error.message)
            })
        })
        .catch(error => {
          this.spinning = false
          console.log('[getChannel error]', error.message)
        })
    },
    renderMessages(messageList, goToBottom = true, isPastMessage = false) {
      // console.log('[renderMessages]')
      this.messageList.forEach(message => {
        // console.log('[message]', message.sender.nickname, message.message)
        if (SendBirdAction.getInstance().isCurrentUser(message.sender)) {
          message.isUser = true
        }
      })
      // group message by sender
      const result = this.messageList.reduce((acc, value) => {
        if (acc.length && acc[acc.length - 1][0].sender.nickname === value.sender.nickname) {
          acc[acc.length - 1].push(value)
        } else {
          acc.push([value])
        }
        return acc
      }, [])
      this.messageList = result.reverse()
      // console.log(result)
      this.scrollToEnd()
    },
    scrollToEnd() {
      const container = this.$refs.containerChat
      if (container) container.scrollTop = container.scrollHeight
      this.down = false
    },
    scrollToBottom() {
      const container = this.$refs.containerChat
      window.scrollTo(0, container.scrollHeight)
    },
    _addEventHandler() {
      const channelEvent = new SendBirdChatEvent()
      channelEvent.onMessageReceived = (channel, message) => {
        console.log('[onMessageReceived]', channel, message)
        if (this.channelUrl === channel.url) {
          // this.renderMessages([message], true)
          this.getMessageList(this.channelUrl)
        }
      }
      channelEvent.onMessageUpdated = (channel, message) => {
        console.log('[onMessageUpdated]', channel, message)
        if (this.channelUrl === channel.url) {
          // this.renderMessages([message], true)
          this.getMessageList(this.channelUrl)
        }
      }
      channelEvent.onMessageDeleted = (channel, messageId) => {
        if (this.channelUrl === channel.url) {
          // this.main.removeMessage(messageId, false)
          this.getMessageList(this.channelUrl)
        }
      }

      if (this.channel.isGroupChannel()) {
        channelEvent.onReadReceiptUpdated = groupChannel => {
          if (this.channelUrl === groupChannel.url) {
            // this.main.updateReadReceipt()
          }
        }
        channelEvent.onTypingStatusUpdated = groupChannel => {
          if (this.channelUrl === groupChannel.url) {
            // this.main.updateTyping(groupChannel.getTypingMembers())
          }
        }
      }
    }
    // swipe(key) {
    //  console.log(key)
    //  this.down = true
    //  console.log(this.down)
    // }
  }
}
</script>
