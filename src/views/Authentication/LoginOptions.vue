<template>
<div class="login-options pa-15">
  <a-row type="flex" justify="center" class="full-height">
    <a-col>
      <h3 class="text-center mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime itaque
        tenetur eos ullam fuga dicta voluptate in, perferend
      </h3>
      <a-row v-for="(button, i) in loginOptions" :key="i" type="flex" justify="center" class="mb-2">
        <a-button block v-if="button.path === '/login-email'" size="large" :type="button.icon" :icon="button.icon" @click.prevent="$router.push(button.path)">
          {{ button.title }}
        </a-button>
        <a-button v-else block size="large" :type="button.icon" :icon="button.icon" @click.prevent="loginProvider(button.path)">
          {{ button.title }}
        </a-button>
      </a-row>
      <a-row type="flex" justify="center">
        <p class="font-weight-bold mr-2">
          {{ $i18n.t(`auth.NotAMember`) }}
        </p>
        <router-link to="/signup" class="font-weight-bold mr-2">
          {{ $i18n.t(`auth.Signup`) }}
        </router-link>
      </a-row>
    </a-col>
  </a-row>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { baseURL } from '@/utils/constant'

export default {
  name: 'LoginOptions',
  computed: {},
  created() {
    // reset login status
    this.logout()
    this.$store.dispatch('auth/setAction', 'login')
  },
  methods: {
    ...mapActions('auth', ['logout']),
    loginProvider(provider) {
      window.location.href = `${baseURL}/connect/${provider}`
    }
  },
  data() {
    return {
      loginOptions: [
        {
          title: this.$i18n.t('loginOptions.Email'),
          path: '/login-email',
          icon: 'mail'
        },
        {
          title: this.$i18n.t('loginOptions.Google'),
          path: 'google',
          icon: 'google'
        },
        {
          title: this.$i18n.t('loginOptions.Apple'),
          path: 'apple',
          icon: 'apple'
        },
        {
          title: this.$i18n.t('loginOptions.Facebook'),
          path: 'facebook',
          icon: 'facebook'
        },
        {
          title: this.$i18n.t('loginOptions.Linkedin'),
          path: 'linkedin',
          icon: 'linkedin'
        }
      ]
    }
  }
}
</script>
