<template>
<div class="check-out">
  <a-form @submit.prevent="onSubmit">
    <CheckoutProgressBar />
    <a-modal
    v-model="isModalVisible"
    :dialog-style="{ top: '180px'}"
    :closable="false"
    :maskClosable="true"
    :maskStyle="{ backgroundColor: 'rgba(196, 196, 196, 0.5)'}"
    class="remove__container" >
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
    <a-card class="cart__item"  v-for="(cartItem, i) in cartItems" :key="i" :bordered="false" >
      <a-row type="flex" class="cart__item_information_container">
        <a-col type="flex" flex="0 1 auto">
          <img class="cart__img" :src="cartItem.product.image ? cartItem.product.image.url : ''" :alt="cartItem.product.name" />
        </a-col>
        <a-col flex="auto">
          <h3 class="cart__title ">{{cartItem.product.name}}</h3>
          <h4 class="cart__composition ">{{cartItem.product.composition}}</h4>
        </a-col>
        <a-col flex="16px">
          <a-icon class="cart__item_icon" type="close" @click.prevent="clearItem(cartItem, cartItem.quantity)" />
        </a-col>
      </a-row>
      <a-row type="flex" class="cart__count" justify="space-between" align="middle">
        <a-col flex="0 1 70px" >
          <h3 v-if="cartItem.product.price" class="cart__price_unit">{{$i18n.t(`cart.Euro`)}} {{cartItem.product.price}} </h3>
        </a-col>
        <a-col type="flex" flex="0 1 15vh">
          <a-row type="flex" class="add-quantity" >
            <a-col :span="3" class="text-center primary-dark-color " v-on:click="addItemToCart(cartItem, cartItem.quantity-1)">
              <i class="feather-minus fa-2x"></i>
            </a-col>
            <a-col :span="3" class="text-center primary-dark-color">
              <span class="text-h3">{{ cartItem.quantity }}</span>
            </a-col>
            <a-col :span="3" class="text-center primary-dark-color " v-on:click="addItemToCart(cartItem, cartItem.quantity+1)">
              <i class="feather-plus fa-2x" ></i>
            </a-col>
          </a-row>
        </a-col>
        <a-col flex="0 1">
          <h3 v-if="cartItem.product.price" class="cart__price">{{cartItem.subTotalPrice}}  </h3>
        </a-col>
      </a-row>
    </a-card>
    <a-row type="flex" justify="space-between" class="cart__total">
        <a-col :span="20">
          <h3 class="text-h3 cart__total_caption">{{$i18n.t(`cart.SousTotal`)}}</h3>
        </a-col>
        <a-col>
            <h3 v-if="subTotalPrice" class="cart__price">{{subTotalPrice}} </h3>
        </a-col>
    </a-row>
    <a-row type="flex" class="cart__total" justify="space-between" align="middle" >
      <a-col :span="20">
        <h3 class="text-h3 cart__total_caption">{{$i18n.t(`cart.DeliveryFee`)}}</h3>
        <p style="font-size: 12px; color: #999;">
          {{ orderInfo.delivery_type ? orderInfo.delivery_type.name + ' ' + orderInfo.delivery_type.deliveryFee.toFixed(2) + 'EUR' : '' }}
        </p>
      </a-col>
      <a-col>
        <h3 v-if="subTotalPrice" class="cart__price"> {{ orderInfo.delivery_type ? orderInfo.delivery_type.deliveryFee.toFixed(2) : ''}} </h3>
      </a-col>
    </a-row>
    <a-divider style="border:1px solid grey"></a-divider>
      <a-row type="flex" justify="space-between" align="middle" class="cart__total" >
        <a-col flex="auto">
          <h3 class="text-h3 cart__total_caption">{{$i18n.t(`cart.Total`)}}</h3>
        </a-col>
        <a-col>
          <h3 v-if="subTotalPrice" class="cart__price_total">{{$i18n.t(`cart.Euro`)}} {{totalPrice}} </h3>
        </a-col>
      </a-row>
    <div class="check-out__footer">
      <CheckoutFlowButton :onSubmit="onSubmit" :goBack="goBack" :buttonLoading="buttonLoading"/>
    </div>
  </a-form>
</div>
</template>

<script>
import CheckoutFlowButton from '@/components/Product/CheckoutFlowButton'
import CheckoutProgressBar from '@/components/Product/CheckoutProgressBar'
import { pmPaypalId, paypalSdk, paypalClientId } from '@/utils/constant'

const script = document.createElement('script')
const currency = 'EUR'
const intent = 'capture'

export default {
  name: 'Confirm',
  components: {
    CheckoutFlowButton,
    CheckoutProgressBar
  },
  data() {
    return {
      isModalVisible: false,
      targetItem: null,
      buttonLoading: false,
      pmPaypalId: pmPaypalId,
      loaded: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    cartItems() {
      return this.$store.state.cart.cartItems
    },
    subTotalPrice() {
      return this.$store.state.cart.subTotalPrice
    },
    orderInfo() {
      return this.$store.state.order.orderInfo
    },
    paypalOrderId() {
      return this.$store.state.payment.paypalOrderId
    },
    totalPrice() {
      return (Number(this.subTotalPrice) + Number(this.orderInfo.delivery_type ? this.orderInfo.delivery_type.deliveryFee : 0)).toFixed(2)
    },
    stripePaymentMethodId() {
      return this.$store.state.stripe.stripePaymentMethodId
    }
  },
  watch: {
    async $route(to, from) {
      if (from.name === 'Payment' && to.name === 'Confirm' && this.loaded && this.orderInfo.payment_method === pmPaypalId) {
        await this.setLoaded()
      }
    }
  },
  mounted() {
    if (this.orderInfo.payment_method === pmPaypalId) {
      script.setAttribute('src', `${paypalSdk}?client-id=${paypalClientId}&intent=${intent}&currency=${currency}&commit=false`)
      script.addEventListener('load', this.setLoaded)
      document.head.appendChild(script)
    }
  },
  methods: {
    setLoaded() {
      this.loaded = true
      var self = this
      window.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'white',
          layout: 'horizontal',
          tagline: false,
          height: 46
        },
        createOrder: async function(data, actions) {
          let orderData = []
          const dataForm = {
            delivery_type: self.orderInfo.delivery_type.id
          }
          orderData = await self.$store.dispatch('paypal/createOrder', dataForm)

          if (!orderData) {
            this.$message.error(this.$i18n.t('auth.Error'))
          }
          return orderData.data.orderID
        },
        onApprove: async function(data, actions) {
          const dataForm = {
            user: self.user.id,
            orderId: data.orderID
          }
          await self.$store.dispatch('payment/storePaypalIds', dataForm)
          self.payment_method = pmPaypalId
          self.onSubmit()
        },
        onError: err => {
          console.log(err)
        }
      }).render('#paypal-button-container')
    },
    onSubmit() {
      this.buttonLoading = true
      const dataForm = {
        user_delivery_address: this.orderInfo.shipping_address,
        delivery_type: this.orderInfo.delivery_type.id,
        payment_method: this.orderInfo.payment_method,
        paypalOrderId: this.orderInfo.payment_method === 2 ? this.paypalOrderId : '',
        stripePaymentMethodId: this.orderInfo.payment_method === 3 ? this.stripePaymentMethodId : ''
      }
      this.$store.dispatch('order/checkOut', dataForm)
        .then((res) => {
          if (res.status === 402) {
            throw res.data.message
          }
          this.buttonLoading = false
          this.$router.push('/checkout-complete')
          this.$store.dispatch('cart/clearCartItems')
        })
        .catch(error => {
          this.buttonLoading = false
          this.$message.error(error + ' ' + this.$i18n.t('auth.Error'))
          console.log('error ', error)
        })
    },
    goBack() {
      this.$router.push('/checkout-payment')
    },
    addItemToCart(item, quantity) {
      if (quantity === 0) {
        this.isModalVisible = true
        this.targetItem = item
      } else if (quantity > 0) {
        const data = { product: item.product.id, quantity: quantity }
        this.$store.dispatch('cart/addItemToCart', data)
      }
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
    },
    clearItem(item, quantity) {
      quantity = 0
      if (quantity === 0) {
        this.isModalVisible = true
        this.targetItem = item
      }
    }
  }
}
</script>
<style scoped>
.icon {
    position: absolute;
    right: 10px;
    top: 18px;
    font-size: 16px;
    color: #646464;
}
</style>
