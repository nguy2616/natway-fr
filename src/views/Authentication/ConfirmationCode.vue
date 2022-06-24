<template>
<div class="signup-phone pa-10">
  <a-row type="flex" justify="center" class="full-height">
    <a-col>
      <h3 class="text-center mb-8">{{$i18n.t(`auth.VerifyText`)}}</h3>
      <a-row type="flex" justify="center">
        <a-input id="partitioned" type="text" maxlength="4" />
      </a-row>
      <a-row type="flex" justify="center" class="ma-0">
        <a-button class="text-h6" size="large" type="primary" block html-type="submit" :loading="loading" @click="submitForm('ruleForm')">
          {{$i18n.t(`auth.Verify`)}}
        </a-button>
      </a-row>
      <a-row type="flex" justify="center">
        <p class="font-weight-bold mr-2">
          {{ $i18n.t(`auth.NotReceiveYet`) }}
        </p>
        <router-link to="/signup-phone" class="font-weight-bold mr-2">
          {{ $i18n.t(`auth.Resend`) }}
        </router-link>
      </a-row>
    </a-col>
  </a-row>
</div>
</template>

<script>
export default {
  name: 'ConfirmationCode'
}
</script>

<style>

</style>
