/* eslint-disable new-cap */
<template>
<div class="chat pa-6 container">
  <a-row>
    <h2  v-if="this.$store.state.auth.jwt" class="text-h2">Bonjour {{ this.user.firstName }} {{ this.user.lastName}},</h2>
    <h2  v-else class="text-h2">Bonjour,</h2>
    <p> Notre réseau de naturopathes est la pour répondre a toutes vos questions. Nous faisons le maximum pour vous répondre dans le meilleurs délais </p>
  </a-row>
  <a-row class="chatbox mb-6">
    <a-col>
      <a-row class="input my-5">
        <a-textarea size="large" style="border-radius: 16px; border-color: #92A65F; height: 100px" :placeholder="$t('chat.AskQuestion')"></a-textarea>
      </a-row>
      <a-row class="text-center">
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <a-button class="text-h6" size="large" type="primary" block @click="onChat">
            <img contain :src="`/img/send-message.png`" class="mr-2" />
            {{ $i18n.t(`chat.SendMessage`) }}
            </a-button>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <!-- <div class="naturopaths-online mb-6"  v-if="naturopaths.length > 0" >
    <div class="naturopath-scrolls ml-n4">
      <template v-for="(item, i) in naturopaths">
        <a-card class="naturopath__item--horizontal" hoverable :bordered="false" :key="i" @click="(e)=> { $router.push({ name: `Messages`, params: { id: item.userId, title: item.nickname, selectedUserId: item.userId } }) }">
          <img class="naturopath__img" :src="item.profileUrl" :alt="item.nickname" />
          <h6 class="naturopath__title">
            <a-badge :status=" item.connectionStatus === 'online' ? 'success' : 'default' " />
            {{ item.nickname }}
          </h6>
        </a-card>
      </template>
    </div>
  </div> -->

  <a-row class="previous-chat">
    <h1 class="text-h1 second-dark-color mb-5">{{ $t('Recent chats') }}</h1>
    <a-row type="flex" justify="center" align="middle" v-if="this.$store.state.auth.jwt && spinning" >
      <a-spin :spinning="spinning" class="ma-1" size="small" />
      <a-spin :spinning="spinning" class="ma-1"/>
      <a-spin :spinning="spinning" class=" ma-1" size="large" />
    </a-row>
    <div v-else-if="!spinning && groupChannelList.length > 0" >
    <a-card class="mb-4" style="width: 100%; border-radius: 16px" :bordered="false" v-for="(channel, i) in groupChannelList" :key="i" @click=" e => { $router.push({ name: `Messages`, params: { id: channel.partner.userId, title: channel.partner.nickname, channel: channel, img:channel.partner.plainProfileUrl } }) } ">
      <a-row type="flex">
        <a-col :span="8">
          <a-avatar :size="80" icon="user" :src="channel.partner && channel.partner.profileUrl" />
        </a-col>
        <a-col :span="16">
          <a-row type="flex" justify="space-between" align="middle">
            <a-col :span="18">
              <h3 class="text-h3">
                {{ channel.partner ? channel.partner.nickname : 'Unknown User' }}
              </h3>
            </a-col>
            <a-col :span="2" class="text-right">
              <a-icon type="right" />
            </a-col>
          </a-row>
          <p>{{ channel.lastMessage.message }}</p>
          <a-row type="flex" justify="space-between" align="middle">
            <span>{{ timestampFromNow(channel.lastMessage.createdAt) }}</span>
            <a-badge :count="channel.unreadMessageCount" />
          </a-row>
        </a-col>
      </a-row>
    </a-card>
    </div>
    <a-empty v-else description="You don't have any chat yet  " />
  </a-row>
   <a-modal v-model="visible" okText="Login" @ok="handleOk">
         <p> Please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> to continue!!!  </p>
    </a-modal>
</div>

</template>

<script>
// import Vue from 'vue'
// import { SendBirdEvent } from '@/store/api/SendBird/SendBirdEvent'

import { timestampFromNow } from '@/store/api/SendBird/utils'
// import { SendBirdAction } from '@/store/api/SendBird/SendBirdAction'
// const sendbirdAction = SendBirdAction.getInstance()

export default {
  components: {},
  name: 'Chat',
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    groupChannelList() {
      return this.$store.state.chat.channels
    },
    naturopaths() {
      return this.$store.state.chat.naturopaths
    },
    onlineNaturopaths() {
      return this.$store.state.chat.onlineNaturopaths
    }
  },
  data() {
    return {
      spinning: true,
      naturopathsList: [],
      visible: false,
      unreadMsg: 0,
      channel: null
    }
  },
  created() {
    if (this.$store.state.auth.user) {
      this.getChatData()
      this.countUnreadMsg()
      console.log(this.$store.state.chat.channels)
    }
  },
  watch: {
    user(newDataUser) {
      if (newDataUser) {
        this.getChatData()
      }
    },
    $route(to, from) {
      if (from.name === 'Messages') {
        this.countUnreadMsg()
        this.channel = null
      }
    }
  },
  methods: {
    timestampFromNow,
    getChatData() {
      if (this.groupChannelList) {
        this.spinning = false
      }
    },
    // getNaturopaths() {
    //  this.$store.dispatch('naturopath/getNaturopath', '')
    //    .then(res => {
    //      this.naturopathsList = res.data
    //      this.$store.dispatch('chat/getUserList', this.naturopathsList)
    //    })
    // },
    handleOk() {
      this.visible = false
      this.$router.push('/signup-email')
    },
    countUnreadMsg() {
      this.unreadMsg = 0
      this.groupChannelList.forEach(channel => {
        this.unreadMsg += channel.unreadMessageCount
      })
      this.$store.commit('chat/setUnreadMsg', this.unreadMsg)
    },
    // timestampFromNow,
    // getUserList(isInit = false) {
    //  sendbirdAction
    //    .getUserList(isInit)
    //    .then(userList => {
    //      this.userList = userList
    //      this.combineUser(this.userList, this.naturopathList)
    //    })
    //    .catch(error => {
    //      console.log('[getUserList error]', error.message)
    //    })
    // },
    // getGroupChannelList(isInit = false) {
    //  sendbirdAction
    //    .getGroupChannelList(isInit)
    //    .then(groupChannelList => {
    //      console.log(groupChannelList)
    //      this.groupChannelList = groupChannelList
    //      this.$store.state.chat.channels = this.groupChannelList
    //      groupChannelList.forEach(channel => {
    //        channel.members.forEach(member => {
    //          if (!sendbirdAction.isCurrentUser(member)) {
    //            channel.partner = member
    //          }
    //        })
    //      })
    //      // Vue.set(this, 'groupChannelList', groupChannelList.map(item => item))

    //      this.spinning = false
    //    //  this.$message.success('Group channel list fetched')
    //    })
    //    .catch(error => {
    //      console.log('[getGroupChannelList error]', error.message)
    //      this.$message.error(error.message)
    //    })
    // },

    // combineUser(senbird, fe) {
    //  senbird.forEach(user => {
    //    fe.forEach(naturo => {
    //      if (user.userId.toString() === naturo.id.toString()) {
    //        if (user.connectionStatus === 'online') {
    //          this.onlineNaturopaths.push(user)
    //        }
    //        this.naturopaths.push(user)
    //      }
    //    })
    //  })
    //  this.$store.state.chat.naturopaths = this.naturopaths
    //  this.$store.state.chat.onlineNaturopaths = this.onlineNaturopaths
    //  console.log('nats', this.$store.state.chat.naturopaths)
    //  console.log('onlinenats', this.onlineNaturopaths)
    // },
    onChat() {
      if (this.$store.state.auth.jwt) {
        if (this.onlineNaturopaths.length > 0) {
          this.groupChannelList.forEach(channel => {
            this.chatHistory(channel)
          })
          if (this.channel) {
            this.$router.push({ name: 'Messages', params: { id: this.onlineNaturopaths[0].id, title: this.onlineNaturopaths[0].fullName, channel: this.channel, img: this.onlineNaturopaths[0].image ? this.onlineNaturopaths[0].image.url : null } })
          } else {
            this.$router.push({ name: 'Messages', params: { id: this.onlineNaturopaths[0].id, title: this.onlineNaturopaths[0].fullName, selectedUserId: this.onlineNaturopaths[0].id, img: this.onlineNaturopaths[0].image ? this.onlineNaturopaths[0].image.url : null } })
          }
        } else {
          const h = this.$createElement
          this.$info({
            content: h('div', {}, [
              h('p', this.$t('chat.NoNaturopath'))
            ]),
            onOk() {}
          })
        }
      } else {
        this.visible = true
      }
    },
    chatHistory(channel) {
      if ((Number(channel.members[0].userId) === this.user.id && Number(channel.members[1].userId) === this.onlineNaturopaths[0].id) || (Number(channel.members[0].userId) === this.onlineNaturopaths[0].id && Number(channel.members[1].userId) === this.user.id)) {
        this.channel = channel
      }
    }
  }
}
</script>
