<template>
<transition>
  <a-layout class="page-layout">
    <a-layout-header class="layout-header">
      <a-row type="flex" justify="space-around" align="middle">
        <a-col>
          <a-icon v-if="$route.path !== '/login'" @click.prevent="$router.go(-1)" type="left" style="font-size: 20px" />
        </a-col>
        <a-col />
        <a-col>
          <h1 class="header--title">
            {{ $i18n.t(`router.${$route.name}`) }}
          </h1>
        </a-col>
        <a-col />
        <a-col>
          <a-button v-if="skippablePath.includes($route.path)" type="link" size="large" @click.prevent="goNext">
            Skip
          </a-button>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</transition>
</template>

<script>
export default {
  name: 'ViewAuth',
  data() {
    return {
      skippablePath: [
        '/user-profile',
        '/user-skills',
        '/precautionary-form',
        '/natway-chart'
      ],
      user: {
        id: 16,
        //  role: { id: 4, type: 'user' },
        role: { id: 3, type: 'naturopath' },
        name: 'Ryan Hale'
      }
      // user: this.$store.state.auth.user,
    }
  },
  methods: {
    goNext(e) {
      e.preventDefault()
      if (this.$route.path === '/natway-chart') {
        this.$router.push('/contacts')
      } else if (this.$route.path === '/user-profile' && this.user.role.type === 'user') {
        this.$router.push(
          this.skippablePath[this.skippablePath.findIndex((path) => path === this.$route.path) + 2]
        )
      } else {
        this.$router.push(
          this.skippablePath[this.skippablePath.findIndex((path) => path === this.$route.path) + 1]
        )
      }
    }
  }
}
</script>
