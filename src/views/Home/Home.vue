<template>
<div class="home container">
  <div class="px-4 mb-6">
  <div class="search-bar">
    <a-input size="large" class="header--search" :placeholder="$t('search.placeholder.SearchResult')" @click.prevent="click" v-if="$route.name === 'Home'">
      <i slot="prefix" class="feather-search c-pointer second-color" />
      <i slot="suffix" class="icon-scan c-pointer second-color" />
    </a-input>
  </div>
  </div>
  <!--
  <a-row class="pa-6 pr-0" type="flex" justify="space-between">
    <a-col :span="7">
      <a-button size="large" class="read-news" @click="(e) => { $router.push('/articles') } ">
        {{$t('home.SeeAllNews')}}
        <a-icon type="arrow-right" />
      </a-button>
    </a-col>
    <a-col :span="16" class="benefits">
      <img class="read-benefits--img" :src="require('@/assets/image/plantes/bruyere.jpg')" />
      <a-button size="large" class="read-benefits" @click="(e) => { $router.push('/remedies') } ">
        {{$t('home.BenefitsOfBruyere')}}
        <a-icon type="arrow-right" />
      </a-button>
    </a-col>
  </a-row>
  -->
  <ArticlesSpecial/>
<div class="naturopaths-online pt-4">
  <a-row type="flex" justify="space-between" align="bottom" class="mb-4 ml-4">
    <h2 class="float-left second-dark-color text-h2 row-2 mb-0" style="width: 195px">{{$t('naturopath.NaturopathsOnline')}}</h2>
    <a-button class="float-right" type="link" @click=" (e) => { $router.push('/naturopaths')} ">{{$t('ViewAll')}}</a-button>
  </a-row>
  <div class="naturopath-scrolls" v-if="onlineNaturopaths.length > 0">
    <template v-for="(item, i) in naturopaths">
      <NaturopathItemHorizontally :key="i" :naturopath="item" />
    </template>
  </div>
   <div class="naturopath-scrolls" v-else>
    <template v-for="(item, i) in naturopathsList">
      <NaturopathItemHorizontally :key="i" :naturopath="item" />
    </template>
  </div>
</div>
  <ProductLatest />
  <!-- <Remedies /> -->
  <!-- <News /> -->
  <!-- <Articles /> -->
</div>
</template>

<script>
import ArticlesSpecial from '@/components/Articles/ArticlesSpecial.vue'
import NaturopathItemHorizontally from '@/components/Naturopaths/NaturopathItemHorizontally'
import ProductLatest from '@/components/Product/ProductLatest.vue'
// import Remedies from '@/components/Home/Remedies.vue'
// import News from '@/components/Home/News.vue'
// import Articles from '@/components/Home/Articles.vue'

export default {
  name: 'Home',
  components: {
    // Remedies,
    // News,
    ArticlesSpecial,
    NaturopathItemHorizontally,
    ProductLatest
  },
  data() {
    return {
      unreadMsg: 0
    }
  },
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
    },
    naturopathsList() {
      return this.$store.state.naturopath.naturopathsList
    }
  },
  created() {
    this.getNaturopaths()
    if (this.$store.state.auth.user) {
      this.getChatData()
      this.countUnreadMsg()
    }
  },
  watch: {
    user(newDataUser) {
      if (newDataUser) {
        this.getChatData()
        this.countUnreadMsg()
      }
    },
    $route(to, from) {
      if (to.name === 'Chat' || to.name === 'Home' || to.name === 'Naturopaths') {
        this.$store.dispatch('chat/getUserList', this.naturopathsList)
      }
    }
  },
  methods: {
    click() {
      if (this.$route.name === 'Home') {
        this.$router.push({
          name: 'SearchResult'
        })
      }
    },
    getChatData() {
      this.$store.dispatch('chat/getGroupChannelList')
      this.$store.dispatch('chat/getUserList', this.naturopathsList)
      this.spinning = false
    },
    getNaturopaths() {
      this.$store.dispatch('naturopath/getNaturopath', '?_sort=average_rate:desc')
    },
    countUnreadMsg() {
      this.unreadMsg = 0
      this.groupChannelList.forEach(channel => {
        this.unreadMsg += channel.unreadMessageCount
      })
      this.$store.commit('chat/setUnreadMsg', this.unreadMsg)
    }
  }
}
</script>
