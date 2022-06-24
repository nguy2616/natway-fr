<template>
<div class="produits container" ref="container" >
  <div class="px-4">
    <SearchBar :placeholder="$t('search.placeholder.Shop')" @handleSearch="handleSearch" />
  </div>
  <a-tabs v-model="current" class="articles ml-4" type="card" size="large" @change="callback">
    <a-tab-pane  :key="0" :tab="$t('All')">
   <div class="product-scrolls">
    <template v-for="(item, i) in productsList">
      <ProductItemHorizontally :key="i" :product="item" />
    </template>
</div>
  <div v-if="productsList.length" v-observe-visibility="scrollDown"></div>
    </a-tab-pane>
    <a-tab-pane :key="1" :tab="$t('Favorite')">
        <div class="product-scrolls">
    <template v-for="(item, i) in fav_products">
      <ProductItemHorizontally :key="i" :product="item" />
    </template>
</div>
  <div v-if="fav_products.length" v-observe-visibility="scrollDown"></div>
    </a-tab-pane>
  </a-tabs>

</div>
</template>

<script>
import ProductItemHorizontally from '@/components/Product/ProductItemHorizontally'
import SearchBar from '@/components/Common/SearchBar'

export default {
  name: 'Shop',
  components: { ProductItemHorizontally, SearchBar },
  computed: {
    productsList() {
      return this.$store.state.product.productsList
    }
  },
  data() {
    return {
      searchValue: '',
      limit: 10,
      length: 10,
      fav_products: [],
      current: 0
    }
  },
  watch: {
    $route(to, from) {
      // console.log('from', from.name)
      if (from.name === 'DetailsProduct') {
        this.getProducts()
      }
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    handleSearch(searchValue) {
      this.current = 0
      this.searchValue = searchValue
      this.getProducts()
    },
    getProducts() {
      this.$store.dispatch('product/getProducts', `?_sort=average_rate:desc&_limit=${this.limit}&searchValue=${this.searchValue}`)
        .then(() => {
        //  this.products = this.$store.state.product.productsList
          this.length = this.productsList.length
          this.productsList.forEach(pro => {
            this.checkIsFavorite(pro)
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    scrollDown(isVisibile) {
      if (!isVisibile) {
        if (this.length >= this.limit) {
          this.limit += 10
          this.getProducts()
        }
      }
    },
    checkIsFavorite(product) {
      if (this.$store.state.auth.user.fav_products) {
        if (this.$store.state.auth.user.fav_products.some(favp => favp.id === product.id)) {
          product.isFavorite = true
          if (!this.fav_products.some(favn => favn.id === product.id)) {
            this.fav_products.push(product)
          }
        } else {
          product.isFavorite = false
          this.fav_products = this.fav_products.filter(function(e) {
            return e.id !== product.id
          })
        }
      }
    },
    callback(key) {
      this.current = key
      this.getProducts()
    },
    scrollTop() {
      const container = this.$refs.containerChat
      if (container) container.scrollTop = 0
    }
  }
}
</script>
