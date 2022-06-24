<template>
  <div class="check-out white-bg pa-6">
  <span class="text-black">
    <h3>{{$i18n.t(`cart.ChooseShippingAddress`)}}</h3>
  </span>
   <a-radio-group v-model="shipping_address" class="full-width mt-4">
      <a-row v-for="(shippingAddress) in shippingAddressList" :key="shippingAddress.id" type="flex" justify="center" class="mb-2">
        <a-col span="24">
          <div class="rounded-sm mb-2 address-box">
            <a-radio :value="shippingAddress.id" class="full-width">
              <span class='pl-1 address-box-text'>{{ shippingAddress.name }} | {{ shippingAddress.phone }}</span>
              <a-row type="flex" justify="center">
                <a-col span="18">
                  <span class='pl-7 address-box-text'>{{ shippingAddress.address }}</span><br>
                  <span class='pl-7 address-box-text'>{{ shippingAddress.postalCode }} {{ shippingAddress.cityName }}</span>
                </a-col>
                <a-col class="font-weight-bold" span="6" >
                  <!-- <a-col class="font-weight-bold" span="6" @click=" (e) => { $router.push('/checkout-address-add')}"> -->
                  <!-- {{$i18n.t(`Edit`)}} -->
                </a-col>
              </a-row>
            </a-radio>
          </div>
        </a-col>
      </a-row>
    </a-radio-group>
    <a-row type="flex">
      <a-col span="24">
        <a-button class="flow-btn return" block @click="(e)=> { $router.push({ path: '/checkout-address-add' }) }">
          <a-icon  class="icon" style="font-size: 26.25px" type="plus-circle"></a-icon>
          <h4 class="text-h4" style="color: #92A65F">{{ $t('cart.AddShippingAddress') }}</h4>
        </a-button>
      </a-col>
    </a-row>
    <a-row class="flex pt-6" type="flex" justify="center" >
        <a-button type="auth" block @click.prevent="onSubmit('ruleForm')">
          {{ $t('cart.Choose') }}
        </a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'ShippingAddress',
  data() {
    return {
      shipping_address: this.$store.state.order.selectedShippingAddress.id
    }
  },
  computed: {
    shippingAddressList() {
      return this.$store.state.order.shippingAddresses
    },
    orderInfo() {
      return this.$store.state.order.orderInfo
    },
    selectedShippingAddress() {
      return this.$store.state.order.selectedShippingAddress
    }
  },
  watch: {
    async $route(from, to) {
      if (from.path === '/checkout-address-select' && to.path === '/checkout-shipping') {
        this.shipping_address = this.selectedShippingAddress.id
      }
    },
    selectedShippingAddress(selectedShippingAddress) {
      this.shipping_address = selectedShippingAddress.id
    }
  },
  async created() {
    await this.getShippingAddressList()
    if (!this.selectedShippingAddress.id && this.shippingAddressList.length > 0) {
      await this.$store.dispatch('order/setShippingAddress', this.shippingAddressList[0])
    }
  },
  methods: {
    async onSubmit() {
      // set selected shipping address / shipping_address_id on orderInfo
      const shippingAddress = this.shippingAddressList.find(shippingAddress => shippingAddress.id === this.shipping_address)
      await this.$store.dispatch('order/setShippingAddress', shippingAddress)
      this.$router.push('/checkout-shipping')
    },
    goBack() {
      this.$router.push('/checkout-shipping')
    },
    getShippingAddressList() {
      this.$store.dispatch('order/getShippingAddresses')
    }
  }
}
</script>

<style scoped>
.ant-col {
    align-self: center;
}
.icon {
    position: absolute;
    left: 15px;
    bottom: 5px;
}
</style>
