<template>
  <a-card
    :bordered="false"
    class="product__item--horizontal"
    @click=" (e) => { $router.push({ name: `DetailsProduct`, params: { id: product.id, title: product.name }, }) } "
  >
    <a-row type="flex" justify="center">
      <!-- <img class="product__img" :src="`img/produits/${product.codeId}.png`" :alt="product.name" /> -->
      <img class="product__img" :src="product.image.url" :alt="product.name" />

      <h3 class="product__title">{{ product.name }}</h3>
    </a-row>
    <a-row type="flex" justify="space-between" align="bottom">
      <a-col>
        <h6 class="product__price" v-if="product.price"> {{ product.price }} EUR </h6>
        <a-rate class="product__rate" :value="product.average_rate" allow-half />
      </a-col>
      <a-col >
        <i v-if="product.isFavorite === true" class="fa fa-heart product__icon" @click.stop="removeFavorite(product)"></i>
        <i v-else class="far fa-heart product__icon" @click.stop="addFavorite(product)"></i>
      </a-col>
    </a-row>
      <a-modal v-model="visible" okText="Login" @ok="handleOk">
         <p> Please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> to continue!!!  </p>
    </a-modal>
  </a-card>
</template>

<script>
export default {
  name: 'ProductItemHorizontally',
  props: ['product', 'isPlante'],
  data() {
    return {
      visible: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    addFavorite(product) {
      if (this.$store.state.auth.jwt) {
        this.$store.dispatch('product/addFavProduct', this.product.id)
          .then(res => {
            this.user.fav_products = res.data.fav_products
            this.checkIsFavorite(product)
            this.$message.success('Added to favorite!')
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        this.visible = true
      }
    },
    removeFavorite(product) {
      if (this.$store.state.auth.jwt) {
        this.user.fav_products = this.user.fav_products.filter(pd => pd.id !== product.id)
        const dataForm = { id: this.user.id, fav_products: this.user.fav_products }
        this.$store.dispatch('auth/updateProfile', dataForm)
          .then(() => {
            this.checkIsFavorite(product)
            this.$message.success('Removed from favorite!', 2)
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        this.visible = true
      }
    },
    handleOk() {
      this.visible = false
      this.$router.push('/signup-email')
    },
    checkIsFavorite(product) {
      if (this.user.fav_products) {
        if (this.user.fav_products.some(favproduct => favproduct.id === product.id)) {
          product.isFavorite = true
        } else {
          product.isFavorite = false
        }
      }
    }
  }
}
</script>
