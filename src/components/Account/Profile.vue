<template>
<div class="user-profile pa-6">
  <template v-if="user">
    <a-row type="flex" justify="start" align="middle">
      <a-col>
        <a-avatar size="large" icon="user" />
      </a-col>
      <a-col>
        <div class="pl-4">
          <h3 class="font-weight-bold text-white">{{ user && user.fullName ? user.fullName : user.username}}</h3>
          <a-button type="link" class="pa-0 text-white">{{$i18n.t(`auth.UpdateProfile`)}}</a-button>
        </div>
      </a-col>
      <a-col>
      </a-col>
    </a-row>
    <a-row type="flex" justify="end" align="middle">
      <a-button @click="logout" type="link" class="pa-0 text-white">{{$i18n.t(`auth.Logout`)}}</a-button>
    </a-row>
  </template>
  <template v-else>
    <a-row class="mb-5">
      <h3 class="text-white">{{ $t('Welcome')}}</h3>
    </a-row>
    <a-row type="flex" justify="end" align="middle">
      <a-col>
        <a-button @click="()=> { $router.push({ name: `LoginOptions`, params: { prePage: 'Account' } }) }" type="primary" class="mx-1">{{$i18n.t(`auth.Login`)}}</a-button>
      </a-col>
      <a-col>
        <a-button @click="()=> { $router.push({ name: `SignupRoleOptions`, params: { prePage: 'Account' } }) }" class="mx-1"> {{$i18n.t(`auth.Signup`)}} </a-button>
      </a-col>
    </a-row>
  </template>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  name: 'Profile',
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
