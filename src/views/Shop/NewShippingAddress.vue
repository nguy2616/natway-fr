<template>
<div class="check-out white-bg pa-6">
  <span class="text-black">
    <h3>{{$i18n.t(`cart.AddShippingAddress`)}}</h3>
  </span>
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
    <div class="mt-4 mb-5" :key="updateKey">
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-model-item class="mb-2" prop="name">
            <a-input v-model="ruleForm.name" placeholder="Prénom, Nom" type="name" size="large" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-model-item class="mb-2" prop="phone">
            <a-input v-model="ruleForm.phone" placeholder="Téléphone" type="name" size="large" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-model-item class="mb-2" prop="address">
            <a-textarea v-model="ruleForm.address" placeholder="Adresse de livraison" style="height: 82px; margin-bottom: 0px; font-size: 16px"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-item class="mb-3" validateStatus="error">
            <a-select
              class="code"
              show-search
              size="large"
              :value="postalCodeData ? (postalCodeData.address.postalCode ? postalCodeData.address.postalCode : '') + ' ' + postalCodeData.address.city + (postalCodeData.address.district ? ', ' + postalCodeData.address.district : '') : undefined"
              :allow-clear="true"
              :placeholder="$t('auth.Code')"
              style="width: 100%"
              :default-active-first-option="false"
              :show-arrow="false"
              :filter-option="false"
              :not-found-content="null"
              @search="searchPostalCode"
              @change="handleSelectChange"
            >
              <template v-for="(d, j) in this.$store.state.hereAPI.postal_code_options">
                <a-select-option :key="j" :value="j">
                  {{ d.address.postalCode ? d.address.postalCode : ''}} {{ d.address.city ? d.address.city : '' }} {{ d.address.district ? ', ' + d.address.district : '' }}
                </a-select-option>
              </template>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </div>
    <div class="check-out__footer">
      <a-form-model-item>
        <a-row type="flex" justify="center" >
          <a-button size="large" type="auth" block html-type="submit" @click="onSubmit('ruleForm')" :loading="buttonLoading">
            {{$i18n.t(`cart.Add`)}}
          </a-button>
        </a-row>
      </a-form-model-item>
    </div>
  </a-form-model>
</div>
</template>

<script>

export default {
  name: 'NewShippingAddress',
  data() {
    return {
      buttonLoading: false,
      updateKey: '',
      postalCodeData: this.selectedPostalCodeData ? this.selectedPostalCodeData : null,
      ruleForm: {
        name: '',
        phone: '',
        address: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$i18n.t('cart.InputDeliveryName')
          }
        ],
        phone: [
          {
            required: true,
            message: this.$i18n.t('cart.InputPhone')
          }
        ],
        address: [
          {
            required: true,
            message: this.$i18n.t('cart.InputDeliveryAddress')
          }
        ]
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    orderInfo() {
      return this.$store.state.order.orderInfo
    },
    selectedPostalCodeData() {
      return this.$store.state.hereAPI.selected_item
    }
  },
  watch: {
    async $route(from, to) {
      if (from.path === '/checkout-shipping') {
        this.postalCodeData = null
        this.ruleForm.phone = ''
        this.ruleForm.name = ''
        this.ruleForm.address = ''
      }
      if (from.path === '/checkout-address-add' && to.path === '/checkout-shipping') {
        this.updateKey = await this.getKey()
      }
    }
  },
  methods: {
    getKey() {
      const time = new Date().getTime().toString()
      return 'key' + time
    },
    async onSubmit(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          this.buttonLoading = true

          const dataForm = {
            user: this.$store.state.auth.user.id,
            phone: this.ruleForm.phone,
            name: this.ruleForm.name,
            address: this.ruleForm.address,
            postalCode: this.postalCodeData && this.postalCodeData.address ? this.postalCodeData.address.postalCode : '',
            cityName: this.postalCodeData && this.postalCodeData.address ? this.postalCodeData.address.city : ''
          }

          this.$store.dispatch('order/createShippingAddress', dataForm)
            .then(() => {
              this.getShippingAddressList()
              this.$message.success(this.$i18n.t('cart.CardAddedSuccessfully'), 2)
            })
            .catch(error => {
              this.$message.error(this.$i18n.t('auth.Error'))
              console.log('error ', error)
            })
        }
      })
      this.buttonLoading = false
      this.$router.push('/checkout-shipping')
    },
    goBack() {
      this.$router.push('/shipping-address-select')
    },
    searchPostalCode(query) {
      this.$store.dispatch('hereAPI/getOptions', query)
    },
    handleSelectChange(key) {
      this.postalCodeData = this.$store.state.hereAPI.postal_code_options[key]
      this.$store.dispatch('hereAPI/setSelectedOption', this.postalCodeData)
      this.$store.dispatch('hereAPI/resetOptions')
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
