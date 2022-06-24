<template>
<div class="signup-email pa-8">
  <a-row type="flex" justify="center" class="">
    <a-col :span=24>
        <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
          <a-form-model-item has-feedback prop="email">
            <a-input
              allowClear
              size="large"
              autocomplete="off"
              v-model="ruleForm.email"
              :placeholder="$i18n.t(`auth.Email`)"
            />
          </a-form-model-item>
          <!--<a-row type="flex" justify="center">
            <a-col class="d-flex justify-center flex-column">
              <p class="ma-0">{{ $i18n.t(`signup.AcceptCondition`) }}</p>
              <a-button
                type="link"
                class="pa-0 mb-6 height-auto"
                html-type="submit"
                @click.prevent="$message.info($i18n.t('Comingsoon'))"
              >
                {{ $i18n.t(`signup.GeneralCondition`) }}
              </a-button>
            </a-col>
          </a-row>-->
          <a-form-model-item class="mb-15">
            <a-row type="flex" justify="center" class="ma-0">
              <a-button
                size="large"
                type="auth"
                block
                html-type="submit"
                :loading="loading"
                @click="submitForm('ruleForm')"
              >
                {{ $t('auth.Continuer') }}
              </a-button>
            </a-row>
          </a-form-model-item>
        </a-form-model>
            <h3 class="mb-8"><a-divider>OU</a-divider></h3>
              <!--<h1 class="text-center">{{ this.$store.state.auth.role == 4 ? $i18n.t(`User`) : $i18n.t(`Naturopath`)}}</h1>
      <h3 class="text-center mb-8">{{$i18n.t(`auth.BecomeAMember`)}}</h3>-->
      <div class="mb-8">
        <a-row v-for="(button, i) in loginOptions" :key="i"  class="mb-2">
            <a-button block size="large" type="social" @click.prevent="loginProvider(button.path)">
                <a-row type="flex">
                    <a-col :span=5><img contain :src="button.icon" /> </a-col>
                     <a-col :span=16> {{ button.title }}</a-col>
                </a-row>
            </a-button>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { baseURL } from '@/utils/constant'

export default {
  name: 'SignupWithEmail',
  data() {
    return {
      loading: false,
      loginOptions: [
        {
          title: this.$i18n.t('loginOptions.Google'),
          path: 'google',
          icon: require('@/assets/image/google.svg')
        },
        {
          title: this.$i18n.t('loginOptions.Apple'),
          path: 'apple',
          icon: require('@/assets/image/apple.svg')
        },
        {
          title: this.$i18n.t('loginOptions.Facebook'),
          path: 'facebook',
          icon: require('@/assets/image/facebook.svg')
        },
        {
          title: this.$i18n.t('loginOptions.Linkedin'),
          path: 'linkedin',
          icon: require('@/assets/image/linkedin.svg')
        }
      ],
      ruleForm: {
        email: ''
      },
      rules: {
        email: [
          {
            type: 'email',
            message: this.$i18n.t('auth.ErrorEmail')
          },
          {
            required: true,
            message: this.$i18n.t('auth.InputEmail')
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      if (!this.loading) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const data = {
              email: this.ruleForm.email
            }
            this.$store.dispatch('auth/checkEmail', data)
              .then(res => {
                if (res.data.action === 'signup') {
                  this.$router.push({ name: 'SignupProfile', params: { email: this.ruleForm.email } })
                } else if (res.data.action === 'login' && res.data.provider !== 'local') {
                  this.loginProvider(res.data.provider)
                } else {
                  this.$router.push({ name: 'LoginWithEmail', params: { email: this.ruleForm.email } })
                }
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    loginProvider(provider) {
      window.location.href = `${baseURL}/connect/${provider}`
    },
    ...mapActions('auth', ['logout'])
  },
  created() {
    this.logout()
    this.$store.dispatch('hereAPI/resetSelectedOption')
    this.$store.dispatch('auth/setAction', 'login')
  },
  watch: {
    $route(from) {
      if (from.path === '/login-email' || from.path === '/signup') {
        // console.log(from)
        this.ruleForm.email = null
      }
    }
  }
}
</script>
