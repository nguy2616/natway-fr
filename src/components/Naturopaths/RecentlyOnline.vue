<template>
<div class="naturopaths-online pt-4">
  <a-row type="flex" justify="space-between" align="bottom" class="mb-4 ml-4">
    <h2 class="float-left second-dark-color text-h2 row-2 mb-0" style="width: 195px">{{$t('naturopath.NaturopathsOnline')}}</h2>
    <a-button class="float-right" type="link" @click=" (e) => { $router.push('/naturopaths')} ">{{$t('ViewAll')}}</a-button>
  </a-row>
  <div class="naturopath-scrolls" v-if="combineNatsList.length > 0">
    <template v-for="(item, i) in combineNatsList">
      <NaturopathItemHorizontally :key="i" :naturopath="item" />
    </template>
  </div>
   <div class="naturopath-scrolls" v-else>
    <template v-for="(item, i) in naturopathsList">
      <NaturopathItemHorizontally :key="i" :naturopath="item" />
    </template>
  </div>
</div>
</template>

<script>
// import router from './router'
import NaturopathItemHorizontally from '@/components/Naturopaths/NaturopathItemHorizontally'
export default {
  name: 'RecentlyOnline',
  components: { NaturopathItemHorizontally },
  data() {
    return {
      HomeNaturopathList: []
    }
  },
  computed: {
    onlineNaturopaths() {
      return this.$store.state.chat.onlineNaturopaths
    },
    naturopaths() {
      return this.$store.state.chat.naturopaths
    },
    user() {
      return this.$store.state.auth.user
    },
    naturopathsList() {
      return this.$store.state.naturopath.naturopathsList
    },
    combineNatsList() {
      return this.$store.state.chat.combineNatsList
    }
  },
  created() {
    this.getSpecialities()
    this.getHomeNaturopathList()
  },
  watch: {
    $route(to, from) {
      // console.log('from', from.name)
      if (this.$route.name === 'Home' && this.user) {
      }
    },
    user(newDataUser) {
      if (newDataUser) {
        this.getHomeNaturopathList()
      }
    }
  },
  methods: {
    getHomeNaturopathList() {
      this.HomeNaturopathList = this.naturopathsList
      let flag = 0
      for (let index = 0; index < this.naturopathsList.length; index++) {
        if (this.naturopathsList[index].connectionStatus === 'online') {
          if (flag !== index) {
            // this.naturopathsList.unshift(this.naturopathsList[index])
            this.naturopathsList.splice(flag, 0, this.naturopathsList[index])
            this.naturopathsList.splice(index + 1, 1)
          }
          flag++
          // console.log(this.naturopathsList)
        }
      }
      this.HomeNaturopathList.forEach(nat => {
        console.log(nat.id, nat.firstName, nat.connectionStatus)
      })
    },
    getSpecialities() {
      this.$store.dispatch('naturopath/getSpecialities')
        .then(() => {
          this.specialities = this.$store.state.naturopath.specialities
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getOnlineNaturopath(sendbird, fe) {
      fe.forEach(naturo => {
        sendbird.forEach(user => {
          if (naturo.id.toString() === user.userId.toString()) {
            naturo.connectionStatus = 'online'
            console.log(naturo.connectionStatus)
          }
        })
      })
    }
  }
}
</script>
