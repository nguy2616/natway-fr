<template>
  <div class="password pa-10">
  <a-row class="mb-5" type="flex" justify="center">
    <a-col :span=24>
        <p class="mb-5">
        {{$i18n.t(`auth.ForgotMes`)}}
      </p>
       <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
          <a-form-model-item  has-feedback prop="email">
            <a-input
              class="mb-10"
              allowClear
              size="large"
              autocomplete="off"
              v-model="ruleForm.email"
              :placeholder="$i18n.t(`auth.Email`)"
            />
          </a-form-model-item>
          <a-form-model-item class="mb-15">
            <a-row type="flex" justify="center" class="ma-0">
              <a-button
                class="text-h6"
                size="large"
                type="auth"
                block
                html-type="submit"
                :loading="loading"
                @click="submitForm('ruleForm')"
              >
                {{ $t('auth.SendLink') }}
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
  name: 'ForgotPassword',
  data() {
    return {
      loading: false,
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
      console.log('submit')
      if (!this.loading) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const data = {
              email: this.ruleForm.email
            }
            this.$store.dispatch('auth/forgotPassword', data)
              .then(res => {
                this.$message.success(`${this.$i18n.t('auth.SentMes')} ${this.ruleForm.email}.`, 2)
              })
              .catch(error => {
                this.$message.error(error)
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

<style>

</style>
