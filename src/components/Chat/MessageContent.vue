<template>
<div>
  <div class="chat-message" type="flex" ref="chatMessage">
      <template v-for="(message, i) in messageGroup">
        <a-col v-if="user.id.toString() === message._sender.userId" class="message-content message-sender" :key="i" >
        <!--<a-col :span="12"></a-col>-->
          <!--<a-col :span="20"></a-col>-->
            <!--<a-row type="flex">
              <div class="time mr-2">{{timestampToTime(message.createdAt)}}</div>
            </a-row>-->
            <a-row class="message-content-display" type="flex" justify="end">
              <a-col :span="24" flex="95%" class="message-user mb-2" @click.prevent="showTime">{{message.message}}</a-col>
              <!--<a-col type="flex">
                <a-avatar class="message-avatar"  size="large" icon="user" shape="square" :src="message._sender.profileUrl" /></a-col>-->
            </a-row>
            <a-row type="flex" justify="center">
               <p v-if="showtime === true" class="time">{{timestampToTime(message.createdAt)}}</p>
            </a-row>
        </a-col>
        <a-col v-else type="flex" class="message-content message-receiver" :key="i">
          <!--<a-row type="flex" justify="end">
            <div class="time ml-4">{{timestampToTime(message.createdAt)}}</div>
          </a-row>-->
          <a-row class="message-content-display" type="flex" justify="start">
            <!--<a-col type="flex">
              <a-avatar v-if="i == 0" class="message-avatar"  size="large" icon="user" shape="square" :src="message._sender.profileUrl" /></a-col>-->
            <a-col :span="24" flex="95%" class="message-other mb-2" @click.prevent="showTime">{{message.message}}</a-col>
          </a-row>
           <a-row type="flex" justify="center">
               <p v-if="showtime === true" class="time">{{timestampToTime(message.createdAt)}}</p>
            </a-row>
        </a-col>
      </template>
  </div>
</div>
</template>

<script>
import {
  timestampToTime, timestampFromNow
} from '@/store/api/SendBird/utils'
export default {
  name: 'MessageContent',
  props: ['messageGroup'],
  methods: {
    timestampToTime,
    timestampFromNow,
    showTime() {
      if (this.showtime === false) {
        this.showtime = true
      } else {
        this.showtime = false
      }
    }
  },
  data() {
    return {
      showtime: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>
<style scoped>
/*.message-user {
    border: 1px solid;
    padding: 5px;
    border-radius: 16px;
    color: white;
    background-color: #92A65F
}
.message-other {
    border: 1px solid #BDB8B6;
    padding: 5px;
    border-radius: 16px;
    background-color: #BDB8B6
}*/
</style>
