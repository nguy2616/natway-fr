<template>
<div class="check-out white-bg">
  <a-form @submit.prevent="onSubmit">
    <CheckoutProgressBar />
    <h3 class="text-h3 mt-5">{{$i18n.t(`cart.SelectPayment`)}}</h3>
    <div class="mt-2">
      <!-- stripe credit cards -->
       <template v-for="(cardData, i) in cardsList">
        <input type="radio" :id="cardData.id" v-model="payment_method" :value="i+3" :key="i+3" style="display: none">
        <label :for="cardData.id" :key="'label'+cardData.id">
          <div :class="['rounded-sm mt-2 mb-2', payment_method === i+3 ? 'option-box-selected' : 'option-box']">
            <a-row type="flex">
                <a-col class="mr-3">
                    <img v-if="cardData.card.brand === 'visa'" width="25px" height="25px" :src="require('@/assets/image/payments/visa.svg')" alt="brand">
                    <img v-else-if="cardData.card.brand === 'mastercard'" width="25px" height="25px" :src="require('@/assets/image/payments/mastercard.svg')" alt="brand">
                    <img v-else-if="cardData.card.brand === 'amex'" width="25px" height="25px" src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="brand">
                    <img v-else-if="cardData.card.brand === 'discover'" width="25px" height="25px" src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg" alt="brand">
                    <!-- <img v-else-if="cardData.card.brand === 'cartes_bancaires'" width="25px" height="25px" :src="require('@/assets/image/payments/mastercard.svg')" alt="brand"> -->
                    <!-- <img v-else-if="cardData.card.brand === 'diners_club'" width="25px" height="25px" :src="require('@/assets/image/payments/mastercard.svg')" alt="brand"> -->
                    <!-- <img v-else-if="cardData.card.brand === 'unionpay'" width="25px" height="25px" :src="require('@/assets/image/payments/mastercard.svg')" alt="brand"> -->
                    <img v-else width="25px" height="25px" src="" alt="brand">
                </a-col>
                <a-col>
                    <div class="type">
                        <h5 class="text-h5"> {{ cardData.card.last4 ? '**** **** **** ' + cardData.card.last4 : '' }}</h5>
                        <p v-if="cardData.card.exp_month && cardData.card.exp_year" class="p mr-8">Expire {{ cardData.card.exp_month + '/' + cardData.card.exp_year.toString().substr(-2) }}</p>
                    </div>
                </a-col>
            </a-row>
          </div>
        </label>
      </template>
      <!-- Paypal and COD -->
      <template v-for="(type) in types">
        <input type="radio" :id="type.name" v-model="payment_method" :value="type.id" :key="type.id" style="display: none">
        <label :for="type.name" :key="'label'+ type.id">
          <div :class="['rounded-sm mt-2 mb-2', payment_method === type.id ? 'option-box-selected' : 'option-box']">
            <a-row type="flex">
                <a-col class="mr-3">
                    <img width="25px" height="25px" :src="type.img" alt="brand">
                </a-col>
                <a-col>
                    <div class="type">
                        <h5 class="text-h5"> {{ type.id === pmPaypalId &&  paypalEmail ? paypalEmail : type.name }}</h5>
                    </div>
                </a-col>
            </a-row>
          </div>
        </label>
      </template>
    </div>

    <a-row type="flex" class="mt-12">
        <a-col :span=24>
            <a-button
                shape="round"
                type="auth"
                style="font-size: 14px"
                block
              >
                <a-icon  class="icon" style="font-size: 26.25px" type="plus-circle"></a-icon>
                <h4 class="text-h4 text-white" @click="(e)=> { $router.push('/new-payment') }">{{ $t('cart.AddPayment') }}</h4>
              </a-button>
        </a-col>
    </a-row>
    <div class="check-out__footer">
      <CheckoutFlowButton :onSubmit="onSubmit" :goBack="goBack"/>
    </div>
  </a-form>
</div>
</template>

<script>
import CheckoutFlowButton from '@/components/Product/CheckoutFlowButton'
import CheckoutProgressBar from '@/components/Product/CheckoutProgressBar'
import { pmCODId, pmPaypalId, pmStripeId } from '@/utils/constant'

export default {
  name: 'Payment',
  components: {
    CheckoutFlowButton,
    CheckoutProgressBar
  },
  data() {
    return {
      loaded: false,
      paidFor: false,
      paypalEmail: 'PayPal',
      isModalVisible: false,
      targetItem: null,
      pmPaypalId: pmPaypalId,
      payment_method: pmCODId, // credit card
      types: [
        { id: pmPaypalId, name: 'PayPal', img: require('@/assets/image/payments/paypal.svg') },
        { id: pmCODId, name: 'Cash on delivery', img: require('@/assets/image/payments/cash.svg') }
      ]
    }
  },
  async created() {
    await this.getCardsList()
  },
  computed: {
    orderInfo() {
      return this.$store.state.order.orderInfo
    },
    user() {
      return this.$store.state.auth.user
    },
    cartItems() {
      return this.$store.state.cart.cartItems
    },
    subTotalPrice() {
      return this.$store.state.cart.subTotalPrice
    },
    totalPrice() {
      return (Number(this.subTotalPrice) + Number(this.orderInfo.delivery_type ? this.orderInfo.delivery_type.deliveryFee : 0)).toFixed(2)
    },
    cardsList() {
      return this.$store.state.stripe.cardsList
    }
  },
  watch: {
    orderInfo(orderInfo) {
      if (orderInfo && orderInfo.payment_method) {
        this.payment_method = orderInfo.payment_method
      } else {
        this.payment_method = pmCODId
      }
    },
    user(user) {
      if (!user) {
        this.$store.dispatch('stripe/clearCardsList')
      } else {
        this.getCardsList()
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.payment_method >= pmStripeId) {
        this.orderInfo.payment_method = pmStripeId // stripe
        const targetCardData = this.cardsList[this.payment_method - pmStripeId]
        // set paymentMethodId to execute payments with the card info on back-end
        this.$store.dispatch('stripe/setPaymentMethodId', targetCardData.id)
        this.payment_method = 3
      }

      this.orderInfo.payment_method = this.payment_method
      const dataForm = this.orderInfo
      this.$store.dispatch('order/updateOrderInfo', dataForm)
        .then(() => {
          this.$router.push('/checkout-confirm')
        })
        .catch(error => {
          this.$message.error(this.$i18n.t('auth.Error'))
          console.log('error ', error)
        })
    },
    goBack() {
      this.$router.push('/checkout-shipping')
    },
    getCardsList() {
      this.$store.dispatch('stripe/getCardsList')
    }
  }
}
</script>
<style scoped>
.icon {
    position: absolute;
    left: 15px;
    bottom: 5px;
}
.payment {
    border-radius: 4px;
    border: 1px solid #c9d3af;
    height: 56px;
    width: 100%;
}
.ant-col {
    align-self: center;
}
.p {
    margin-bottom: 0;
    font-size: 10px;
    color: #282828;
}

</style>
