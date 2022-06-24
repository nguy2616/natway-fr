<template>
<transition :name="transitionName">
  <a-layout
    class="page-layout"
    :class="$route.meta && $route.meta.viewComponent === 'MainView' ? 'hasBottom' : ''"
    :style="$route.meta && $route.meta.viewComponent === 'SubViewSlideUpModal' ? 'margin-top:  -1px' :''"
  >
    <a-layout-header v-if="['SearchResult'].includes($route.name)" class="layout-header pa-0 ma-0">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col>
          <h1 class="header--title" style="padding: 10px 20px;"> {{ $i18n.t(`router.${$route.name}`) }} </h1>
        </a-col>
        <a-col>
          <a-button type="link" @click.prevent="$router.go(-1)" class="layout-icon px-0" style="top: -16px;">
            <img contain :src="require('@/assets/image/Icon-close@2x.png')" style="width: 30px" />
          </a-button>
        </a-col>
      </a-row>
    </a-layout-header>

    <MainHeader v-else-if="['MainView', 'SubView'].includes($route.meta && $route.meta.viewComponent)" />
    <SignupProcessHeader v-else-if="['SignupProcess'].includes($route.meta && $route.meta.viewComponent)" />

    <a-layout-content :class="['layout-content', detailsClass]">
      <keep-alive exclude="DetailsRemedy, DetailsProduct, NaturoDetails, ArticleDetails, Messages">
        <router-view />
      </keep-alive>
      <!-- <FloatingChatButton v-if="$route.meta && $route.meta.viewComponent === 'MainView'"/> -->
      <FloatingChatButton v-if="$route.meta && $route.meta.viewComponent === 'MainView' && !['Discussions', 'Chat'].includes($route.name)" />
    </a-layout-content>
    <MainMenuBottom v-if="$route.meta && $route.meta.viewComponent === 'MainView'"/>
  </a-layout>
</transition>
</template>

<script>
export default {
  name: 'PageView',
  components: {
    MainHeader: () => import('@/components/Layout/MainHeader'),
    SignupProcessHeader: () => import('@/components/Layout/SubHeader'),
    MainMenuBottom: () => import('@/components/Layout/MainMenuBottom'),
    FloatingChatButton: () => import('@/components/Layout/FloatingChatButton')
  },
  data() {
    return {
      transitionName: 'slide-right',
      detailsClass: ''
    }
  },
  mounted() {
    this.detailsClass = this.$route.name === 'ArticleDetails' ? 'layout-details' : ''
  },
  watch: {
    '$route'(to, from) {
      this.detailsClass = to.name === 'ArticleDetails' ? 'layout-details' : ''
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (this.$route.meta && this.$route.meta.viewComponent === 'SubViewSlideUpModal') {
        this.transitionName = toDepth < fromDepth ? 'slide-up' : 'slide-down'
      } else this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>
