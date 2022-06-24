<template>
<div class="product-latest pt-4 pl-4">
  <a-row type="flex" justify="space-between" align="bottom" class="mb-4 ml-4">
    <h2 class="float-left second-dark-color text-h2 row-2 mb-0 ">{{$t('product.ProductLatest')}}</h2>
  </a-row>
  <div class="product-scrolls">
    <template v-for="(item, i) in latestProducts">
      <ProductItemHorizontally :key="i" :product="item" />
    </template>
  </div>
  <a-row type="flex" justify="center" align="bottom">
    <a-button type="link" @click=" (e) => { $router.push('/shop')} ">{{$t('ViewAll')}}</a-button>
  </a-row>
</div>
</template>

<script>
import ProductItemHorizontally from '@/components/Product/ProductItemHorizontally'
export default {
  name: 'ProductLatest',
  components: {
    ProductItemHorizontally
  },
  data() {
    return {
      latestProducts: []
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      this.$store.dispatch('product/getProducts', '?_limit=4')
        .then(() => {
          this.latestProducts = this.$store.state.product.productsList
          //  console.log(this.latestProducts)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
