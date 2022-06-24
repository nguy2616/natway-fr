<template>
<div class="signup-role-options pa-15">
  <a-carousel autoplay>
    <div v-for="(item,i) in carouselImgs" :key="i">
      <img :src="item.url" class="max-width"/>
    </div>
  </a-carousel>
  <a-row type="flex" justify="center">
    <a-col>
      <h3 class="text-center my-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h3>
      <a-row v-for="(button, i) in signupOptions" :key="i" type="flex" justify="center" class="px-8">
        <a-button block size="large" :class="['mb-5', button.class ]" :type="button.type" :icon="button.icon" @click.prevent="setRole(button)">
          {{ button.title }}
        </a-button>
      </a-row>
      <a-row type="flex" justify="center">
        <p class="font-weight-bold mr-2">{{ $i18n.t(`auth.Registered`) }}</p>
        <router-link to="/login" class="font-weight-bold mr-2">
          {{ $i18n.t(`auth.Login`) }}
        </router-link>
      </a-row>
    </a-col>
  </a-row>
</div>
</template>

<script>
export default {
  name: 'SignupRoleOptions',
  data() {
    return {
      carouselImgs: [
        { url: require('@/assets/image/plantes/aloes-vera-2.jpg') },
        { url: require('@/assets/image/plantes/argousier.jpg') },
        { url: require('@/assets/image/plantes/ginseng.jpg') },
        { url: require('@/assets/image/plantes/mauve.jpg') }
      ],
      signupOptions: [
        {
          title: this.$i18n.t('signupRoleOptions.User'),
          path: '/signup-email',
          icon: '',
          roleId: 4,
          type: 'primary'
        },
        {
          title: this.$i18n.t('signupRoleOptions.NaturalPath'),
          path: '/signup-email',
          // path: '/naturo-signup-email',
          icon: '',
          roleId: 3,
          class: 'ant-btn-primary-inverse'
        }
      ]
    }
  },
  created() {
    this.$store.dispatch('auth/setAction', 'signup')
  },
  methods: {
    setRole(data) {
      this.$store.dispatch('auth/setRole', data.roleId)
      this.$router.push(data.path)
    }
  }
}
</script>
