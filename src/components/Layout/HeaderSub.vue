<template>
  <a-layout-header class="layout-header">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col>
        <a-icon v-if="$route.path !== '/login'" @click.prevent="$router.go(-1)" type="left" style="font-size: 20px" />
      </a-col>
      <a-col />
      <a-col>
        <h2 class="header--subpgtitle">
          {{ $i18n.t(`router.${$route.name}`) }}
        </h2>
      </a-col>
      <a-col />
      <a-col />
    </a-row>
    <a-divider></a-divider>
  </a-layout-header>
</template>

<script>

export default {
  name: 'SubPageHeader',
  mounted() {
    console.log(this.$route)
  },
  methods: {}
}
</script>
