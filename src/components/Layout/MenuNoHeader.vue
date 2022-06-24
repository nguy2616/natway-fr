<template>
<transition>
  <a-layout class="page-layout hasBottom">
        <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
    <MainMenuBottom />
  </a-layout>
</transition>
</template>

<script>

export default {
  name: 'MenuNoHeader',
  components: {
    MainMenuBottom: () => import('@/components/Layout/MainMenuBottom')
  }
}
</script>
