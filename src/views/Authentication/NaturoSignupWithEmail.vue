<template>
<div class="signup-email pa-10">
  <a-row type="flex" justify="center" class="">
    <a-col :span=24>
      <h1 class="text-center">{{$i18n.t(`Naturo`)}}</h1>
      <h3 class="text-center mb-8">{{$i18n.t(`auth.BecomeAMember`)}}</h3>

      <div class="mb-8">
         <a-row v-for="(button, i) in signupOptions" :key="i" class="mb-2">
            <a-button
              :type="button.icon"
              block
              size="large"
              :icon="button.icon"
              @click.prevent="$router.push(button.path)"
            >
              {{ button.title }}
            </a-button>
          </a-row>
      </div>
        <h3 class="text-center mb-8">-OR-</h3>
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
        <a-form-model-item has-feedback prop="email">
          <a-input size="large" autocomplete="off" v-model="ruleForm.email" :placeholder="$i18n.t(`auth.Email`)" />
        </a-form-model-item>
        <a-form-model-item has-feedback prop="password">
          <a-input size="large" autocomplete="off" v-model="ruleForm.password" :placeholder="$i18n.t(`auth.Password`)" type="password" />
        </a-form-model-item>
        <a-row type="flex" justify="center">
          <a-col class="d-flex justify-center flex-column">
            <p class="ma-0">{{$i18n.t(`signup.AcceptCondition`)}}</p>
            <a-button type="link" class="pa-0 mb-6 height-auto" html-type="submit" @click.prevent="$message.info($i18n.t('Comingsoon'))">
              {{$i18n.t(`signup.GeneralCondition`)}}
            </a-button>
          </a-col>
        </a-row>
        <a-form-model-item>
          <a-row type="flex" justify="center" class="ma-0">
            <a-button class="text-h6" size="large" type="primary" block html-type="submit" :loading="loading" @click="submitForm('ruleForm')">
              {{$i18n.t(`auth.Signup`)}}
            </a-button>
          </a-row>
        </a-form-model-item>
      </a-form-model>
    </a-col>
  </a-row>
</div>
</template>

<script>
export default {
  name: 'NaturoSignupWithEmail',
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
      signupOptions: [
        {
          title: this.$i18n.t('signupOptions.Google'),
          path: '',
          icon: 'google'
        },
        {
          title: this.$i18n.t('signupOptions.Apple'),
          path: '',
          icon: 'apple'
        },
        {
          title: this.$i18n.t('signupOptions.Facebook'),
          path: '',
          icon: 'facebook'
        },
        {
          title: this.$i18n.t('signupOptions.Linkedin'),
          path: '',
          icon: 'linkedin'
        }
      ],
      ruleForm: {
        email: '',
        password: '',
        role: 3
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
        ],
        password: [
          {
            validator: validatePass,
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      if (!this.loading) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('auth/signup', this.ruleForm)
              .then(() => {
                this.$message.success(this.$i18n.t('auth.LoginSuccess'), 2)
                this.$router.push({
                  path: this.redirect || '/user-profile'
                })
              })
              .catch((error) => {
                this.loading = false
                this.$message.error(this.$i18n.t('auth.LoginError'))
                console.log('error ', error)
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
