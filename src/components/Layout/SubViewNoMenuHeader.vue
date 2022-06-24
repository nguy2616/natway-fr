<template>
<transition>
  <a-layout class="page-layout">
    <HeaderSub />
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</transition>
</template>

<script>
export default {
  name: 'SubViewNoMenuHeader',
  components: {
    HeaderSub: () => import('@/components/Layout/HeaderSub')
  }
}
</script>
