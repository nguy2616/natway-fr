<template>
<div class="search-result pl-5">
  <div class="search-bar pr-5">
    <a-form-model @submit="handleSearch" action="">
      <a-form-model-item>
        <a-input pressEnter allowClear size="large" class="header--search" ref="inputSearch" autofocus="autofocus" autocomplete="off" v-model="searchValue" :placeholder="$t('search.placeholder.SearchResult')" type="search">
          <i slot="prefix" class="feather-search c-pointer second-color" />
          <i slot="suffix" class="icon-scan c-pointer second-color" />/>
        </a-input>
      </a-form-model-item>
    </a-form-model>
    <p v-if="searchValue && searchValue !==''">{{$t('search.ResultsOfYourSearch')}}: <b class="primary-color">{{ searchValue }}</b></p>
  </div>

  <a-row type="flex" class="mt-5" v-if="searchResults.products && searchResults.products.length>0">
    <label for="Products">
      <h3>{{$t('search.Shop')}}</h3>
    </label>
    <template v-for="(product, i) in searchResults.products">
      <ProductItem :key="i" :product="product" />
    </template>
  </a-row>

  <a-row type="flex" class="mt-5" v-if="searchResults.remedies && searchResults.remedies.length>0">
    <label for="Remedies" class="mb-4" >
      <h3>{{$t('search.Remedies')}}</h3>
    </label>
    <template v-for="(remedy, i) in searchResults.remedies">
      <RemedyItem :key="i" :remedy="remedy" />
    </template>
  </a-row>

  <a-row type="flex" class="mt-5" v-if="searchResults.naturopaths && searchResults.naturopaths.length>0">
    <label for="Naturopaths">
      <h3>{{$t('search.Naturopaths')}}</h3>
    </label>
    <template v-for="(naturopath, i) in searchResults.naturopaths">
      <NaturopathItem :key="i" :naturopath="naturopath" />
    </template>
  </a-row>

  <a-row type="flex" class="mt-5" v-if="searchResults.posts && searchResults.posts.length>0">
    <label for="News">
      <h3>{{$t('search.Articles')}}</h3>
    </label>
    <template v-for="(post, i) in searchResults.posts">
      <ArticleItem :key="i" :article="post" />
    </template>
  </a-row>

</div>
</template>

<script>
import RemedyItem from '@/components/Remedy/RemedyItem'
import ArticleItem from '@/components/Articles/ArticleItem'
import ProductItem from '@/components/Product/ProductItem'
import NaturopathItem from '@/components/Naturopaths/NaturopathItem'

export default {
  name: 'SearchResult',
  components: {
    RemedyItem,
    ArticleItem,
    ProductItem,
    NaturopathItem
  },
  computed: {
    searchResults() {
      if (this.$store.state.search.searchResults.naturopaths) {
        console.log('length = ', this.$store.state.search.searchResults.naturopaths.length)
        this.getOnlineNaturopath(this.onlineNaturopaths, this.$store.state.search.searchResults.naturopaths)
      }
      return this.$store.state.search.searchResults
    },
    onlineNaturopaths() {
      console.log(this.$store.state.chat.onlineNaturopaths)
      return this.$store.state.chat.onlineNaturopaths
    }
  },
  data() {
    return {
      searchValue: ''
    }
  },
  mounted() {
    this.$refs.inputSearch.focus({ preventScroll: true })
    this.handleReset()
  },
  watch: {
    searchValue(newValue) {
      if (newValue === '') {
        this.handleReset()
      }
    }
  },
  methods: {
    handleSearch(e) {
      e.preventDefault()
      this.$refs.inputSearch.blur()
      this.$store.dispatch('search/searchAll', this.searchValue)
        .catch(e => {
          console.log(e)
        })
    },
    handleReset() {
      this.$store.dispatch('search/clearResult')
    },
    getOnlineNaturopath(sendbird, fe) {
      fe.forEach(naturo => {
        sendbird.forEach(user => {
          if (naturo.id.toString() === user.id.toString()) {
            naturo.connectionStatus = 'online'
          }
        })
      })
    }
  }
}
</script>
