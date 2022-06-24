<template>
  <transition>
    <component v-bind:is="viewComponent" />
  </transition>
</template>

<script>
export default {
  name: 'ViewComponent',
  components: {
    SubViewSlideUpModal: () => import('@/components/Layout/SubViewSlideUpModal'),
    SubViewNoMenu: () => import('@/components/Layout/SubViewNoMenu'),
    MainView: () => import('@/components/Layout/MainView'),
    SubView: () => import('@/components/Layout/SubView'),
    SubViewNoMenuHeader: () => import('@/components/Layout/SubViewNoMenuHeader'),
    MenuNoHeader: () => import('@/components/Layout/MenuNoHeader')
  },
  computed: {
    viewComponent() {
      if (this.$route.meta.viewComponent) {
        return this.$route.meta.viewComponent
      } else {
        return 'MainView'
      }
    }
  }
}
</script>
