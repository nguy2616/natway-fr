<template>
<transition :name="transitionName" >
  <a-layout class="page-layout" style="margin-top: -1px">
    <a-layout-header class="layout-header pa-0 ma-0">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col>
          <h1 class="header--title" style="padding: 10px 20px;" v-if="['SearchResult'].includes($route.name)">
            {{ $i18n.t(`router.${$route.name}`) }}
          </h1>
        </a-col>
        <a-col>
          <a-button type="link" @click.prevent="$router.go(-1)" class="layout-icon px-0" v-if="['SearchResult'].includes($route.name)" style="top: -16px;">
            <img contain :src="require('@/assets/image/Icon-close@2x.png')" style="width: 30px" />
          </a-button>
          <a-button type="link" @click.prevent="$router.go(-1)" class="layout-icon px-0" v-else>
            <img contain :src="require('@/assets/image/Icon-close@2x.png')" style="width: 30px" />
          </a-button>
          <!-- <i class="fas fa-times layout-icon" /> -->
        </a-col>
      </a-row>
      <!-- <a-row type="flex" justify="end" align="middle"  v-if="['SearchResult'].includes($route.name)">
        <h1 class="header--title" style="padding: 48px 16px 0 0;">
          {{ $i18n.t(`router.${$route.name}`) }}
        </h1>
      </a-row> -->
    </a-layout-header>
    <a-layout-content :class="['layout-content', detailsClass]">
      <router-view />
    </a-layout-content>
  </a-layout>
</transition>
</template>

<script>
export default {
  name: 'SubViewSlideUpModal',
  data() {
    return {
      transitionName: 'slide-up',
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
      this.transitionName = toDepth < fromDepth ? 'slide-up' : 'slide-down'
    }
  }
}
</script>
