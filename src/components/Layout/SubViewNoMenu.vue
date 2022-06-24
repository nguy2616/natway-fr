<template>
<transition>
  <a-layout class="page-layout">
    <SubHeader />
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</transition>
</template>

<script>
export default {
  name: 'SubViewNoMenu',
  components: {
    SubHeader: () => import('@/components/Layout/SubHeader')
  }
}
</script>
