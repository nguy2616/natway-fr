<template>
<div class="product__details" v-if="product">
  <template v-if="product">
    <div class="block__content">
      <a-row class="product__highlight_container" type="flex">
        <div class="block__content--left">
          <h1 class="product__title">{{ product.name }}</h1>
          <!-- <div v-for="(item, i) in product.provider" :key="i"> -->
          <p class="product__cate">
            {{ product.provider && product.provider.name }}
          </p>
          <!-- </div> -->
          <!-- Update new UI for chat in here -->
          <h1 class="product__price">
            {{$i18n.t(`cart.Euro`)}} {{ product.price ? product.price.toFixed(2) : "--" }}
          </h1>
          <a-rate class="product__rate" :value="product.average_rate" allow-half />
          <a-row type="flex" class="product__buttons_container">
            <a-button class="product__tag"> {{ `Natway Analyse` }} </a-button>
            <a-button class="product__favorite" @click.prevent="addFavorite">
              <i :class="['', 'fa-heart', isFavorite ? 'fas' : 'far']" />
            </a-button>
            <a-button class="product__share">
              <i class="fas fa-share-square"></i>
            </a-button>
          </a-row>
        </div>
        <!-- Product image -->`
        <div class="product__img">
          <img :src="product.image && product.image.url" class="max-width" />
        </div>
      </a-row>
      <template v-if="product.description">
        <h2 class="text-h2">{{ $t("product.description") }}:</h2>
        <div class="mb-4">
          <span class="text-content second-dark-color">{{ product.description }}</span>
        </div>
      </template>

      <template v-if="product.extract">
        <h2 class="text-h2">{{ $t("product.extract") }}:</h2>
        <div class="mb-4">
          <span class="text-content second-dark-color">{{ product.extract }}</span>
        </div>
      </template>

      <template v-if="product.composition">
        <h2 class="text-h2">{{ $t("product.composition") }}:</h2>
        <div class="mb-4">
          <span class="text-content second-dark-color">{{ product.composition }}</span>
        </div>
      </template>
    </div>
  </template>
  <a-layout-footer class="product__footer px-4">
    <a-row type="flex" justify="space-between" align="middle" class="pb-3">
      <a-col :span="9">
        <a-row type="flex" justify="center" align="middle" class="add-quantity">
          <a-col v-if="quantity === 0" :span="8" class="text-center primary-dark-color ">
            <i class="feather-minus"></i>
          </a-col>
          <a-col v-else :span="8" class="text-center primary-dark-color " v-on:click="updateQuantity(quantity-1)">
            <i class="feather-minus" v-if="quantity > 0"></i>
          </a-col>
          <a-col :span="8" class="text-center primary-dark-color">
            <span class="text-h2">{{ quantity }}</span>
          </a-col>
          <a-col :span="8" class="text-center primary-dark-color " v-on:click="updateQuantity(quantity+1)">
            <i class="feather-plus"></i>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="14">
        <a-button v-if="quantity === 0" class="remove-item" size="large" block v-on:click="addItemToCart">
          {{$i18n.t(`cart.Remove`)}}
        </a-button>
        <a-button v-else class="add-cart fa-dot_container" size="large" block v-on:click="addItemToCart">
          <p>{{$i18n.t(`cart.Add`)}}</p>
          <i class="fas fa-circle fa-sx fa-dot"></i>
          <p>{{$i18n.t(`cart.Euro`)}} {{ product.totalPrice ? product.totalPrice.toFixed(2) : product.price }}</p>
        </a-button>
      </a-col>
    </a-row>
     <a-modal v-model="visible" okText="Login" @ok="handleOk">
         <p> Please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> to continue!!!  </p>
    </a-modal>
  </a-layout-footer>
</div>
</template>

<script>
export default {
  name: 'DetailsProduct',
  data() {
    return {
      product: null,
      quantity: 1,
      carouselImgs: [],
      isFavorite: null,
      visible: false
    }
  },
  computed: {
    cartItem() {
      if (this.product) {
        // check existing items on shopping cart
        var self = this
        const targetItem = this.$store.state.cart.cartItems.find(function(cartItem, index) {
          return cartItem.product.id === self.product.id
        })
        if (targetItem) {
          return targetItem
        } else {
          return []
        }
      } else {
        return []
      }
    },
    user() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getDetail()
    }
  },
  watch: {
    $route(to, from) {
      console.log('from.name', from.name)
      console.log('to.name', to)
      if (to.params.id) {
        this.getDetail()
      }
      if (to.name === 'Shop') {
        this.product = null
      }
    }
  },
  methods: {
    getDetail() {
      this.$store
        .dispatch('product/getProductDetail', this.$route.params.id)
        .then((res) => {
          this.product = res.data
          //  this.carouselImgs = [{
          //    url: require(`@/assets/image/produits/${this.product.codeId}.png`)
          //  }]
          // check existing items on shopping cart
          const targetItem = this.$store.state.cart.cartItems.find(function(cartItem, index) {
            return cartItem.product.id === res.data.id
          })
          if (targetItem) {
            this.quantity = targetItem.quantity
          } else {
            this.quantity = 1
          }
          // checking product in favorite list
          this.checkIsFavorite(this.product)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    updateQuantity(quantity) {
      this.quantity = quantity
      this.getTotalPrice()
      // console.log('haha', this.product.totalPrice)
    },
    addItemToCart() {
      if (this.$store.state.auth.jwt) {
        if (this.quantity === 0 && this.cartItem) {
          this.$store.dispatch('cart/removeItemFromCart', this.cartItem.id)
            .then(() => {
              this.$message.info(this.$i18n.t('cart.ItemRemoved'))
            })
            .catch((e) => {
              console.log(e)
            })
        } else if (this.quantity > 0) {
          const data = { product: this.product.id, quantity: this.quantity }
          // await this.$store.dispatch('schools/postSchool', data)
          this.$store.dispatch('cart/addItemToCart', data)
            .then(() => {
              this.$message.success('Shopping cart updated!')
            })
            .catch((e) => {
              console.log(e)
            })
        }
      } else {
        this.visible = true
      }
    },
    getTotalPrice() {
      this.product.totalPrice = this.product.price
      if (this.quantity >= 1) {
        this.product.totalPrice = this.product.price * this.quantity
      }
    },
    addFavorite() {
      if (this.$store.state.auth.jwt) {
        if (this.isFavorite !== true) {
          this.$store.dispatch('product/addFavProduct', this.product.id)
            .then(res => {
              this.user.fav_products = res.data.fav_products
              this.checkIsFavorite(this.product)
              this.$message.success('Added to favorite!')
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          this.user.fav_products = this.user.fav_products.filter(product => product.id !== this.product.id)
          const dataForm = { id: this.user.id, fav_products: this.user.fav_products }
          this.$store.dispatch('auth/updateProfile', dataForm)
            .then(() => {
              this.checkIsFavorite(this.product)
              this.$message.success('Removed from favorite!', 2)
            })
            .catch(e => {
              console.log(e)
            })
        }
      } else {
        this.visible = true
      }
    },
    checkIsFavorite(product) {
      if (this.user.fav_products) {
        if (this.user.fav_products.some(favproduct => favproduct.id === product.id)) {
          this.isFavorite = true
        } else {
          this.isFavorite = false
        }
      }
    },
    handleOk() {
      this.visible = false
      this.$router.push('/signup-email')
    }
  }
}
</script>
