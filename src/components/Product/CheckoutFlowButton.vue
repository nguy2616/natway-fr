<template>
  <a-row class="pt-5" type="flex" justify="space-between" align="middle">
    <!-- <a-col :span="!buttonLoading ? 12 : 0">
      <a-button class="flow-btn return" block @click.prevent="goBack">
        {{ $t('auth.Return') }}
      </a-button>
    </a-col> -->
    <a-col v-if="orderInfo.payment_method !== pmPaypalId || pathName != 'Confirm'" flex="auto" class="flow-btn_wrapper">
      <a-button v-if="pathName == 'Shipping'" class="flow-btn next" block @click.prevent="onSubmit('ruleForm')" :loading="buttonLoading">
        <span v-if="this.$route.path != '/checkout-confirm'">{{ $t('cart.Next') }}</span>
        <span v-else>{{ $t('cart.Pay') }}</span>
      </a-button>
      <a-button v-else class="flow-btn next" block @click.prevent="onSubmit" :loading="buttonLoading">
        <div v-if="this.$route.path != '/checkout-confirm'">{{ $t('cart.Next') }}</div>
        <div v-else class="fa-dot_container">
          <p>{{ $t('cart.Pay') }}</p>
          <i class="fas fa-circle fa-sx fa-dot"></i>
          <p>{{$i18n.t(`cart.Euro`)}} {{totalPrice}}</p>
        </div>
      </a-button>
    </a-col>
    <a-col v-if="orderInfo.payment_method === pmPaypalId" :span="buttonLoading ? 24 : 12" :key="updateKey">
      <a-spin :indicator="indicator" :spinning="buttonLoading ? true : false">
        <div class="pt-1">
            <div id="paypal-button-container" ></div>
        </div>
      </a-spin>
    </a-col>
  </a-row>
</template>

<script>
import { pmPaypalId } from '@/utils/constant'
export default {
  name: 'CheckoutFlowButton',
  props: ['onSubmit', 'goBack', 'buttonLoading'],
  data() {
    return {
      pmPaypalId: pmPaypalId,
      updateKey: '',
      indicator: <a-icon type="loading" style="font-size: 24px" spin />
    }
  },
  computed: {
    orderInfo() {
      return this.$store.state.order.orderInfo
    },
    pathName() {
      return this.$route.name
    },
    subTotalPrice() {
      return this.$store.state.cart.subTotalPrice
    },
    totalPrice() {
      return (Number(this.subTotalPrice) + Number(this.orderInfo.delivery_type ? this.orderInfo.delivery_type.deliveryFee : 0)).toFixed(2)
    }
  },
  watch: {
    async $route(from, to) {
      if (from.path === '/checkout-payment' && to.path === '/checkout-confirm') {
        this.updateKey = await this.getKey()
      }
    }
  },
  methods: {
    getKey() {
      const time = new Date().getTime().toString()
      return 'key' + time
    }
  }
}
</script>
