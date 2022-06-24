<template>
  <a-layout-header class="px-5 layout-header-bordered">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <a-button @click.prevent="$router.go(-1)" type="link" class="px-0">
          <i
            v-if=" this.$route.name != 'Welcome' && this.$route.name != 'SignupWithEmail' && this.$route.name != 'Complete'"
            class="feather-arrow-left c-pointer second-color"
            style="font-size: 26px"
          />
          <i
            v-else-if="this.$route.name === 'SignupWithEmail'"
            class="feather-x c-pointer second-color"
            style="font-size: 26px"
          />
        </a-button>
      </a-col>
      <a-col :span="1" />
      <a-col v-if="isSignupProcess">
        <h3 class="text-h3">{{ $i18n.t(`router.${$route.name}`) }}</h3>
      </a-col>
      <a-col :span="1" />
      <a-col :span="1" />
    </a-row>
  </a-layout-header>
</template>

<script>
export default {
  name: 'SignupProcessHeader',
  computed: {
    isSignupProcess() {
      if (
        ['SignupProcess'].includes(
          this.$route.meta && this.$route.meta.viewComponent
        )
      ) {
        return true
      }
      return false
    }
  },
  methods: {}
}
</script>
