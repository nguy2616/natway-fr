<template>
  <div class="password pa-10">
  <a-row class="mb-5" type="flex" justify="center">
    <a-col :span=24>
        <p class="mb-5">
        {{$i18n.t(`auth.ResetMes`)}}
      </p>
       <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
          <a-form-model-item  has-feedback prop="password">
            <a-input-password
              allowClear
              size="large"
              autocomplete="off"
              v-model="ruleForm.password"
              :placeholder="$i18n.t(`auth.Password`)"
            />
          </a-form-model-item>
          <a-form-model-item  has-feedback prop="confirm">
            <a-input-password
              class="mb-5"
              allowClear
              size="large"
              autocomplete="off"
              v-model="ruleForm.confirm"
              :placeholder="$i18n.t(`auth.Confirm`)"
            />
          </a-form-model-item>
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
                {{ $t('auth.Update') }}
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
  name: 'UpdatePassword',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$i18n.t('auth.InputPassword')))
      } else {
        if (this.ruleForm.password !== '' && this.ruleForm.confirm !== '') {
          this.$refs.ruleForm.validateField('password')
        }
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {
        password: '',
        confirm: ''
      },
      rules: {
        password: [{
          validator: validatePass,
          trigger: 'change'
        }],
        confirm: [{
          validator: validatePass,
          trigger: 'change'
        }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      if (this.ruleForm.password === this.ruleForm.confirm) {
        if (!this.loading) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              const data = {
                code: this.$route.query.code,
                password: this.ruleForm.password,
                passwordConfirmation: this.ruleForm.confirm
              }
              this.$store.dispatch('auth/resetPassword', data)
                .then(res => {
                  console.log(res)
                  this.$message.success(this.$i18n.t('auth.ResetSuccess'), 2)
                  this.$router.push('/signup-email')
                })
                .catch(error => {
                  console.log(error)
                  this.$message.error(error)
                })
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      } else {
        console.log(this.$i18n.t('auth.Confirm'))
        this.$message.error(this.$i18n.t('auth.Confirm'))
        return false
      }
    }
  },
  created() {
    console.log(this.$route.query.code)
  }
}
</script>

<style>

</style>
