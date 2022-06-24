<template>
<div class="cart pa-4 white-bg">
  <h2 class="second-dark-color text-h1"> {{$i18n.t(`cart.YourCart`)}} </h2>
  <h3 v-if="cartItems && cartItems.length === 0" class="second-color text-h3 text-center pt-8"> {{$i18n.t(`cart.NoItems`)}} </h3>
  <a-modal
   v-model="isModalVisible"
   :dialog-style="{ top: '180px'}"
   :closable="false"
   :maskClosable="true"
   :maskStyle="{ backgroundColor: 'rgba(196, 196, 196, 0.5)'}"
  >
    <template slot="footer">
      <a-row type="flex" justify="center" align="middle" class="pb-5 remove-item">
        <a-col>
          <a-button class="remove-item-btn cancel" v-on:click="cancel">
            <span class="px-3 primary-dark-color">
              {{$i18n.t(`cart.Cancel`)}}
            </span>
          </a-button>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col>
          <a-button class="remove-item-btn remove" v-on:click="removeItem">
            <span class="px-3">
              {{$i18n.t(`cart.Remove`)}}
            </span>
          </a-button>
        </a-col>
      </a-row>
    </template>
    <h4 class="text-h4">
      {{$i18n.t(`cart.AreYouSure`)}}
    </h4>
  </a-modal>
  <a-card class="product__item"  v-for="(cartItem, i) in cartItems" :key="i" :bordered="false" >
    <img class="product__img" :src="cartItem.product.image ? cartItem.product.image.url : ''" :alt="cartItem.product.name" />
    <h3 class="product__title ">{{cartItem.product.name}}</h3>
    <div>
      <a-row type="flex" justify="space-between" align="middle" >
        <a-col :span="12">
          <h3 v-if="cartItem.product.price" class="product__price">{{cartItem.product.price}} EUR </h3>
        </a-col>
        <a-col :span="12">
          <a-row type="flex" justify="center" align="middle" class="add-quantity">
            <a-col :span="8" class="text-center primary-dark-color " v-on:click="addItemToCart(cartItem, cartItem.quantity-1)">
              <i class="feather-minus"></i>
            </a-col>
            <a-col :span="8" class="text-center primary-dark-color">
              <span class="text-h2">{{ cartItem.quantity }}</span>
            </a-col>
            <a-col :span="8" class="text-center primary-dark-color " v-on:click="addItemToCart(cartItem, cartItem.quantity+1)">
              <i class="feather-plus" ></i>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </a-card>

  <a-layout-footer class="product__footer pa-4">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col>
        <h1 class="product__price ">
          {{ totalPrice && totalPrice != 0.00 ? totalPrice + ' EUR' : "---" }}
        </h1>
      </a-col>
      <a-col>
        <a-button class="add-cart px-7" size="large" block @click="checkOut" :disabled="!user || cartItems.length === 0 ? true : false">
          {{$i18n.t(`cart.CheckOut`)}}
        </a-button>
      </a-col>
    </a-row>
  </a-layout-footer>
</div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      isModalVisible: false,
      targetItem: null
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    cartItems() {
      return this.$store.state.cart.cartItems
    },
    totalPrice() {
      return this.$store.state.cart.subTotalPrice
    }
  },
  watch: {
    user(user) {
      if (!user) {
        this.$store.dispatch('cart/clearCartItems')
        this.$store.dispatch('order/resetOrderInfo')
        this.$store.dispatch('order/resetShippingInfo')
      }
    }
  },
  mounted() {
  },
  methods: {
    addItemToCart(item, quantity) {
      if (quantity === 0) {
        // show pop-up modal
        this.isModalVisible = true
        this.targetItem = item
      } else if (quantity > 0) {
        const data = { product: item.product.id, quantity: quantity }
        this.$store.dispatch('cart/addItemToCart', data)
      }
    },
    checkOut() {
      this.$router.push('/checkout-shipping')
    },
    removeItem() {
      if (this.targetItem) {
        this.$store.dispatch('cart/removeItemFromCart', this.targetItem.id)
        this.targetItem = null
      }
      this.isModalVisible = false
    },
    cancel() {
      this.targetItem = null
      this.isModalVisible = false
    }
  }
}
</script>
