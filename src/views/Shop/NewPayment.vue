<template>
  <div class="check-out white-bg pa-6">
    <span slot="tab" style="color: black;">
      <h3>{{$i18n.t(`cart.AddNewCard`)}}</h3>
    </span>
    <a-form-model class="mt-6" ref="ruleForm" :model="ruleForm" :rules="rules">
      <a-form-model-item label="Name on card" has-feedback prop="name">
        <a-input size="large"  autocomplete="off" v-model="ruleForm.name" :placeholder="$i18n.t(`cart.NameOnCard`)" />
      </a-form-model-item>
      <a-form-model-item label="Card Number" has-feedback prop="cardNumber" class="mb-2">
        <div id="card-number" class="ant-input" style="paddingTop: 18px"></div>
      </a-form-model-item>
      <a-row type="flex" class="mb-0">
          <a-col :span="12">
            <a-form-model-item label="Expiration" has-feedback prop="expire">
              <div id="card-expiry" class="ant-input" style="paddingTop: 18px"></div>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="CVC" has-feedback prop="cvc">
              <div id="card-cvc" class="ant-input" style="paddingTop: 18px"></div>
            </a-form-model-item>
          </a-col>
      </a-row>
      <a-form-model-item>
        <a-row type="flex" justify="center" >
          <a-button size="large" type="auth" block html-type="submit" @click="submitForm('ruleForm')" :loading="buttonLoading">
            {{$i18n.t(`cart.Add`)}}
          </a-button>
        </a-row>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js'
import axios from '@/utils/request'
import { stripePublishableKey } from '@/utils/constant'

export default {
  name: 'NewPayment',
  async mounted() {
    const stripe = await loadStripe(this.pulishableKey)
    this.stripe = stripe

    var elementStyles = {
      base: {
        color: '#646464',
        fontWeight: 500,
        fontFamily: 'Quicksand',
        fontSize: '16px',
        fontSmoothing: 'antialiased',

        '::placeholder': {
          color: '#BFBFBF'
        }
      },
      invalid: {
        color: '#646464',

        '::placeholder': {
          color: '#BFBFBF'
        }
      }
    }

    var elementClasses = {
      focus: 'focused',
      empty: 'empty',
      invalid: 'invalid'
    }

    const elements = stripe.elements({
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Quicksand'
        }
      ]
    })

    var cardNumberElement = elements.create('cardNumber', { style: elementStyles, classes: elementClasses })
    this.cardNumberElement = cardNumberElement
    cardNumberElement.mount('#card-number')

    var cardExpiryElement = elements.create('cardExpiry', { style: elementStyles, classes: elementClasses })
    this.cardExpiryElement = cardExpiryElement
    cardExpiryElement.mount('#card-expiry')

    var cardCvcElement = elements.create('cardCvc', { style: elementStyles, classes: elementClasses })
    this.cardCvcElement = cardCvcElement
    cardCvcElement.mount('#card-cvc')
  },
  data() {
    return {
      pulishableKey: stripePublishableKey,
      buttonLoading: false,
      cardNumberElement: null,
      cardExpiryElement: null,
      cardCvcElement: null,
      stripe: null,
      ruleForm: {
        cardNumber: '',
        expire: '',
        cvc: '',
        name: ''
      },
      rules: {
        email: [{
          type: 'email',
          message: this.$i18n.t('auth.ErrorEmail')
        },
        {
          required: true,
          message: this.$i18n.t('auth.InputEmail')
        }
        ],
        cardNumber: [
          {
            required: true,
            message: this.$i18n.t('cart.InputCardNumber')
          }
        ],
        cvc: [
          {
            required: true,
            message: this.$i18n.t('cart.InputCVC')
          }
        ],
        expire: [
          {
            required: true,
            message: this.$i18n.t('cart.InputExpire')
          }
        ],
        name: [
          {
            required: true,
            message: this.$i18n.t('cart.InputName')
          }
        ]
      }
    }
  },
  methods: {
    async submitForm(formname) {
      this.buttonLoading = true
      let clientSecret = null
      try {
        // get clientSecretId + create user on Stripe to add card
        await axios.get('/create-setup-intent').then(res => {
          clientSecret = res.data.client_secret
        })
      } catch (error) {
        this.$message.error(this.$i18n.t('cart.FailedToAddCard'))
        console.log(error)
      }

      // register a new card
      if (clientSecret) {
        const self = this
        await this.stripe.confirmCardSetup(
          clientSecret,
          {
            payment_method: {
              card: this.cardNumberElement,
              billing_details: {
                name: this.ruleForm.name
              }
            }
          }
        ).then(function(result) {
          if (result.error) {
            self.$message.error(self.$i18n.t('cart.FailedToAddCard') + '. ' + result.error.message)
          } else {
            self.$message.success(self.$i18n.t('cart.CardAddedSuccessfully'), 2)
          }
        })
      }
      this.buttonLoading = false
      this.ruleForm.name = ''
      await this.getCardsList()
      this.$router.push('/checkout-payment')
    },
    getCardsList() {
      this.$store.dispatch('stripe/getCardsList')
    }
  }
}
</script>

<style></style>
