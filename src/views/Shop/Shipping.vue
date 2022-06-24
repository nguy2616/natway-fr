<template>
<div class="check-out white-bg">
  <a-form>
    <CheckoutProgressBar />
    <div class="mt-4 mb-5">
      <a-radio-group class="full-width" default-value="firstOption">
        <a-row type="flex" justify="center">
          <a-col span="24" >
            <div v-if="selectedShippingAddress.id" class="rounded-sm mb-2 address-box" >
                <a-radio value="firstOption" class="full-width" checked>
                  <span class='pl-1 address-box-text'>{{ selectedShippingAddress.name }} | {{ selectedShippingAddress.phone }}</span>
                <a-row type="flex" justify="center">
                  <a-col span="20">
                    <span class='pl-7 address-box-text'>{{ selectedShippingAddress.address }}</span><br>
                    <span class='pl-7 address-box-text'>{{ selectedShippingAddress.postalCode }} {{ selectedShippingAddress.cityName }}</span>
                  </a-col>
                  <a-col span="4" @click=" (e) => { $router.push('/checkout-address-select')}">
                    <img class="vector" contain :src="require('@/assets/image/vector-circle.svg')" />
                  </a-col>
                </a-row>
              </a-radio>
            </div>
          </a-col>
        </a-row>
        <a-row type="flex" justify="end">
          <a-col @click=" (e) => { $router.push('/checkout-address-select')}">
            <h5 class="text-h5 primary-dark-color">
              {{$i18n.t(`cart.ChooseShippingAddress`)}}
              <img class="vector" contain :src="require('@/assets/image/vector.svg')" />
            </h5>
          </a-col>
        </a-row>
      </a-radio-group>
    </div>
    <div class="mt-4">
      <a-row type="flex" justify="start">
        <a-col span="24">
          <h4 class="text-h4 mb-2">{{ `Options de livraison` }}</h4>
        </a-col>
      </a-row>
      <a-radio-group v-model="selectedDeliveryType" style="width: 100%">
        <a-row type="flex" justify="center" v-for="(deliveryType, i) in deliveryTypes" :key="i">
          <a-col span="24">
            <div :class="['rounded-sm mb-2', selectedDeliveryType === deliveryType.id ? 'option-box-selected' : 'option-box']">
              <a-radio :value="deliveryType.id">
                <span class='text-h4'>{{ deliveryType.name }} - {{ Number(deliveryType.deliveryFee).toFixed(2) }}EUR</span>
              </a-radio>
            </div>
          </a-col>
        </a-row>
      </a-radio-group>
    </div>
    <div class="check-out__footer">
       <CheckoutFlowButton :onSubmit="onSubmit" :goBack="goBack"/>
    </div>
  </a-form>
</div>
</template>

<script>
import CheckoutFlowButton from '@/components/Product/CheckoutFlowButton'
import CheckoutProgressBar from '@/components/Product/CheckoutProgressBar'

export default {
  name: 'Shipping',
  components: {
    CheckoutFlowButton,
    CheckoutProgressBar
  },
  data() {
    return {
      deliveryTypes: [],
      selectedDeliveryType: this.orderInfo ? this.orderInfo.delivery_type.id : 1
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    orderInfo() {
      return this.$store.state.order.orderInfo
    },
    selectedShippingAddress() {
      if (this.$store.state.order.selectedShippingAddress.id) {
        return this.$store.state.order.selectedShippingAddress
      } else if (this.shippingAddressList.length > 0) {
        return this.shippingAddressList[0]
      }
      return []
    },
    shippingAddressList() {
      return this.$store.state.order.shippingAddresses
    }
  },
  watch: {
    async $route(from, to) {
      if (from.path === '/cart') {
        this.selectedDeliveryType = 1
      }
    }
  },
  async created() {
    await this.getDeliveryTypes()
    await this.getShippingAddressList()
  },
  methods: {
    onSubmit() {
      if (this.selectedShippingAddress.id) {
        const dataForm = {
          id: this.$store.state.auth.user.id,
          delivery_type: this.deliveryTypes[this.selectedDeliveryType - 1],
          shipping_address: this.selectedShippingAddress.id
        }
        if (this.storeDeliveryInfo) {
          this.$store.dispatch('auth/updateProfile', dataForm)
        }
        this.$store.dispatch('order/updateOrderInfo', dataForm)
          .then(() => {
            this.$router.push('/checkout-payment')
          })
          .catch(error => {
            this.$message.error(this.$i18n.t('auth.Error'))
            console.log('error ', error)
          })
      } else {
        this.$message.error(this.$i18n.t('cart.SelectShippingAddress'))
      }
    },
    goBack() {
      this.$store.dispatch('order/resetOrderInfo')
        .then(() => {
          this.$router.push('/cart')
        })
    },
    getDeliveryTypes() {
      this.$store.dispatch('order/getDeliveryTypes')
        .then((res) => {
          this.deliveryTypes = res.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getShippingAddressList() {
      this.$store.dispatch('order/getShippingAddresses')
    }
  }
}
</script>

<style>
.ant-select-lg .ant-select-selection--single {
    height: 54px;
}
</style>
