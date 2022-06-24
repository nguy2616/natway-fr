<template>
  <div class="signup-phone pa-10">
      <a-row type="flex" justify="center" class="full-height">
          <a-col>
              <h3 class="text-center mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus veritatis earum harum cupiditate quia a</h3>
               <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
                   <a-form-model-item has-feedback prop="phonenumber">
          <a-input size="large" autocomplete="off" v-model="ruleForm.phonenumber" :placeholder="$i18n.t(`auth.Phonenumber`)" />
        </a-form-model-item>
        <a-form-model-item>
          <a-row type="flex" justify="center" class="ma-0">
            <a-button class="text-h6" size="large" type="primary" block html-type="submit" :loading="loading" @click="submitForm('ruleForm')">
              {{$i18n.t(`auth.Next`)}}
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
  name: 'Phone Number',
  data() {
    return {
      loading: false,
      ruleForm: {
        phonenumber: ''
      },
      rules: {
        phonenumber: [
          {
            type: 'text',
            message: this.$i18n.t('auth.ErrorPhonenumber')
          },
          {
            required: true,
            message: this.$i18n.t('auth.InputPhonenumber')
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      if (!this.loading) {
        console.log('submit')
        this.$router.push('confirm-code')
      }
    }
  }
}
</script>

<style>

</style>
