<template>
<div class="login-email pa-8">
  <a-row class="mt-5 mb-5" type="flex" justify="center">
    <a-col>
        <a-row type="flex" justify="center" allign="middle">
             <img class="mt-5 mb-5" width="50%" :src="require('@/assets/image/logo-none-bg.png')" />
      <h1 class="text-center mb-5">
        Welcome to Natway
      </h1>
        </a-row>
      <!-- <h1 class="text-center mb-8">{{$i18n.t(`User`)}}</h1> -->
      <a-form-model class="mt-10" ref="ruleForm" :model="ruleForm" :rules="rules">
        <a-form-model-item has-feedback prop="password">
          <a-input-password size="large"  autocomplete="off" v-model="ruleForm.password" :placeholder="$i18n.t(`auth.Password`)" />
        </a-form-model-item>
        <a-form-model-item>
          <a-row type="flex" justify="center" >
            <a-button size="large" type="auth" block html-type="submit" :loading="loading" @click="submitForm('ruleForm')">
              {{$i18n.t(`auth.Login`)}}
            </a-button>
          </a-row>
        </a-form-model-item>
                <a-row type="flex" justify="center">
                    <router-link to="/forgot-password" class="second-dark-color font-weight-bold text-decoration-underline mr-2">
            {{ $i18n.t(`auth.ForgotPassword`) }}
          </router-link>
        </a-row>
      </a-form-model>
    </a-col>
  </a-row>
</div>
</template>

<script>
export default {
  name: 'LoginWithEmail',
  //  mounted() {
  //    console.log(this.$route.params.prePage)
  //  },
  watch: {
    $route(to, from) {
    //  console.log('from', from)
    //  console.log('to', to)
      if (to.path === '/signup-email') {
        this.ruleForm.password = null
      }
      if (from.path === '/signup-email') {
        this.ruleForm.identifier = this.$route.params.email
      }
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$i18n.t('auth.InputPassword')))
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password')
        }
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {
        identifier: this.$route.params.email,
        password: ''
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
        password: [{
          validator: validatePass,
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      if (!this.loading) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$store.dispatch('auth/login', this.ruleForm)
              .then(() => {
                this.$message.success(this.$i18n.t('auth.LoginSuccess'), 2)
                if (this.$route.params.prePage) {
                //  console.log(this.$route.params.prePage)
                  this.$router.push({ name: this.$route.params.prePage })
                } else this.$router.push({ path: this.redirect || '/' })
              })
              .catch((error) => {
                this.loading = false
                this.$message.error(this.$i18n.t('auth.LoginError'))
                console.log(error)
                this.ruleForm.password = ''
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
}
</script>
