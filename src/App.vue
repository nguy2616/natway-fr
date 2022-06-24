<template>
  <div class="a-application">
    <router-view/>
  </div>
</template>

<script>
import { SendBirdAction } from '@/store/api/SendBird/SendBirdAction'
import { SendBirdConnection } from '@/store/api/SendBird/SendBirdConnection'
import { SendBirdEvent } from '@/store/api/SendBird/SendBirdEvent'
const sendbirdAction = SendBirdAction.getInstance()
const ConnectionManager = new SendBirdConnection()

export default {
  name: 'App',
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  data() {
    return {
      nickname: ''
    }
  },
  created() {
    if (this.$store.state.auth.user) {
      this.loginSendBird()
    } else {
      this.disconnect()
    }
  },
  watch: {
    user(newDataUser) {
      if (newDataUser) {
        this.loginSendBird()
      } else {
        this.disconnect()
      }
    }
  },
  methods: {
    loginSendBird() {
      const userId = this.$store.state.auth.user.id
      const nickname = `${this.user.firstName} ${this.user.lastName}`
      const profileUrl = this.$store.state.auth.user.image ? this.$store.state.auth.user.image.url : null
      sendbirdAction
        .connect(userId, nickname, profileUrl)
        .then(user => {
          // console.log('[user]', user)
          this.nickname = user.nickname
          // this.$message.success(`Sendbird logged ${user.nickname}`)
          this.createConnectionHandler()
          this.createChannelEvent()
          // console.log('SB login')
        })
        .catch(error => {
          console.log('loginSendBird error', error)
        })
    },
    disconnect() {
      sendbirdAction.disconnect()
      ConnectionManager.remove()
      console.log('SB disconnected')
    },
    createConnectionHandler() {
      ConnectionManager.onReconnectStarted = () => {
        // console.log('[SendBird JS SDK] Reconnect : Started')
      }
      ConnectionManager.onReconnectSucceeded = () => {
        // console.log('[SendBird JS SDK] Reconnect : Succeeded')
        // const currentUser = SendBirdAction.getInstance().getCurrentUser()
        // console.log(currentUser)
      }
      ConnectionManager.onReconnectFailed = () => {
        // console.log('[SendBird JS SDK] Reconnect : Failed')
        ConnectionManager.remove()
      }
    },
    createChannelEvent() {
      const channelEvent = new SendBirdEvent()
      channelEvent.onChannelChanged = channel => {
        console.log('onChannelChanged')
        // if (channel._autoMarkAsRead) {
        //   channel.markAsRead()
        // }
        // chatLeft.updateItem(channel, true)
      }
      channelEvent.onUserEntered = (openChannel, user) => {
        if (SendBirdAction.getInstance().isCurrentUser(user)) {
          // const handler = () => {
          //   chat.render(openChannel.url)
          //   ChatLeftMenu.getInstance().activeChannelItem(openChannel.url)
          // }
          // const item = new LeftListItem({ channel: openChannel, handler })
          // chatLeft.addOpenChannelItem(item.element)
          // chat.render(openChannel.url)
        }
      }
      channelEvent.onUserJoined = (groupChannel, user) => {
        console.log('[onUserJoined]')
        // const handler = () => {
        //   chat.render(groupChannel.url, false)
        //   ChatLeftMenu.getInstance().activeChannelItem(groupChannel.url)
        // }
        // const item = new LeftListItem({ channel: groupChannel, handler })
        // chatLeft.addGroupChannelItem(item.element)
        // chat.updateChatInfo(groupChannel)
      }
      channelEvent.onUserLeft = (groupChannel, user) => {
        if (SendBirdAction.getInstance().isCurrentUser(user)) {
          // chatLeft.removeGroupChannelItem(groupChannel.url)
        } else {
          // chatLeft.updateItem(groupChannel)
        }
        // chat.updateChatInfo(groupChannel)
      }
      channelEvent.onChannelHidden = groupChannel => {
        // chatLeft.removeGroupChannelItem(groupChannel.url)
      }
    }

  }
}
</script>
