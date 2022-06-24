import { timestampFromNow } from '@/store/api/SendBird/utils'
import { SendBirdAction } from '@/store/api/SendBird/SendBirdAction'
const sendbirdAction = SendBirdAction.getInstance()

const state = {
  onlUser: null,
  channels: [],
  naturopaths: [],
  onlineNaturopaths: [],
  unreadMsg: 0
}

const mutations = {
  setChannels(state, channels) {
    state.channels = channels
  },
  setSbNaturopaths(state, naturopaths) {
    state.naturopaths = naturopaths
  },
  setOnlineNaturopaths(state, onlineNaturopaths) {
    state.onlineNaturopaths = onlineNaturopaths
  },
  setUnreadMsg(state, unreadMsg) {
    state.unreadMsg = unreadMsg
  }
}

const actions = {
  timestampFromNow,
  getUserList({ commit }, naturopathsList) {
    sendbirdAction
      .getUserList(true)
      .then(userList => {
        // console.log(userList)
        var onlineNaturopaths = []
        var naturopaths = []
        commit('setSbNaturopaths', naturopaths)
        commit('setOnlineNaturopaths', onlineNaturopaths)
        userList.forEach(user => {
          naturopathsList.forEach(naturo => {
            if (user.userId.toString() === naturo.id.toString()) {
              if (user.connectionStatus === 'online') {
                naturo.connectionStatus = user.connectionStatus
                if (!onlineNaturopaths.some(onl => onl.id === naturo.id)) {
                  onlineNaturopaths.push(naturo)
                }
              }
              naturopaths.push(naturo)
            }
          })
        })
        let flag = 0
        for (let index = 0; index < naturopaths.length; index++) {
          if (naturopaths[index].connectionStatus === 'online') {
            if (flag !== index) {
            // naturopaths.unshift(naturopaths[index])
              naturopaths.splice(flag, 0, naturopaths[index])
              naturopaths.splice(index + 1, 1)
            }
            flag++
          // console.log(naturopaths)
          }
        }
        // console.log('naturopaths', naturopaths.length)
        // console.log('online', onlineNaturopaths.length)
        commit('setSbNaturopaths', naturopaths)
        commit('setOnlineNaturopaths', onlineNaturopaths)
      })
      .catch(error => {
        console.log('[getUserList error]', error.message)
      })
  },
  getGroupChannelList({ commit }, isInit = false) {
    let totalUnread = 0
    sendbirdAction
      .getGroupChannelList(isInit)
      .then(groupChannelList => {
        // console.log('channels', groupChannelList)
        commit('setChannels', groupChannelList)
        groupChannelList.forEach(channel => {
          totalUnread += channel.unreadMessageCount
          channel.members.forEach(member => {
            if (!sendbirdAction.isCurrentUser(member)) {
              channel.partner = member
            }
          })
        })
        commit('setUnreadMsg', totalUnread)
        // Vue.set(this, 'groupChannelList', groupChannelList.map(item => item))

        // this.spinning = false
        //  this.$message.success('Group channel list fetched')
      })
      .catch(error => {
        console.log('[getGroupChannelList error]', error.message)
        this.$message.error(error.message)
      })
  },
  disconnect({ commit }) {
    sendbirdAction
      .disconnect()
      .then(() => {
        commit('setSbNaturopaths', [])
        commit('setOnlineNaturopaths', [])
        commit('setChannels', [])
        commit('setUnreadMsg', 0)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
