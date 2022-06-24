<template>
<transition>
  <a-layout class="page-layout hasBottom">
    <MainHeader />
    <a-layout-content class="layout-content">
      <router-view />
      <FloatingChatButton/>
    </a-layout-content>
    <MainMenuBottom />
  </a-layout>
</transition>
</template>

<script>

export default {
  name: 'MainView',
  components: {
    MainHeader: () => import('@/components/Layout/MainHeader'),
    MainMenuBottom: () => import('@/components/Layout/MainMenuBottom'),
    FloatingChatButton: () => import('@/components/Layout/FloatingChatButton')
  }
}
</script>
