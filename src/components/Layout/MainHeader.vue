<template>
<a-layout-header v-if="isAccountPage" :class="[ 'px-5', user ? 'layout-header-colored' : 'layout-header']">
  <a-row type="flex" justify="space-between" align="middle">
    <a-col :span="13">
      <a-button type="link" @click.prevent="$router.go(-1)" class="px-0">
        <i :class="[ 'feather-arrow-left c-pointer', user ? 'text-white-gray' : 'second-color']" style="font-size: 26px" />
      </a-button>
    </a-col>
    <a-col :span="11" v-if="user">
      <a-row type="flex" justify="space-between" align="middle">
        <router-link :to="{name: 'Cart'}">
          <span class="ant-badge">
            <img contain :src="`/img/menu-icons/shopping-cart-white.png`" style="width: 30px" />
            <sup v-if="user && cartItems && cartItems.length > 0" title="2" class="ant-scroll-number ant-badge-count" style="background-color: #52c41a;">{{totalCartQuantity}}</sup>
          </span>
        </router-link>
        <router-link :to="{name: 'Notifications'}">
          <img contain :src="`/img/menu-icons/bell-white.png`" style="width: 25px" />
        </router-link>
        <router-link :to="{name: 'Account'}">
          <img v-if="user.image" contain :src="user.image.url" style="width: 28px; height: 28px; border-radius: 100px" />
          <img v-else contain :src="require('@/assets/image/Icon-profile-white.png')" style="width: 24px" />
        </router-link>
      </a-row>
    </a-col>
  </a-row>
</a-layout-header>

<a-layout-header v-else-if="['Messages'].includes($route.name)" class="px-5 layout-header">
  <a-row type="flex" align="middle">
    <a-col :span="2" >
      <a-button type="link" @click.prevent="$router.go(-1)" class="px-0">
        <i class="feather-arrow-left c-pointer second-color" style="font-size: 26px" />
      </a-button>
    </a-col>
    <a-col>
      <a-row type="flex">
      <a-col v-if="$route.params.img !== null">
       <img class="ml-3 mr-3" :src="$route.params.img" style="width: 40px; height: 40px; border-radius: 50%"/>
      </a-col>
       <a-col>
       <h1 class="header--title"> {{ $route.params && $route.params.title ? $route.params.title : $i18n.t(`router.${$route.name}`) }} </h1>
      </a-col>
      </a-row>
    </a-col>
    <a-col :span="2" />
  </a-row>
</a-layout-header>

<a-layout-header v-else class="px-5 layout-header">
  <a-row type="flex" justify="space-between" align="middle">
    <a-col :span="13">
      <h1 v-if="$route.meta && $route.meta.viewComponent === 'MainView'" class="header--title"> {{ $i18n.t(`router.${$route.name}`) }} </h1>
      <a-button v-if="$route.meta && $route.meta.viewComponent === 'SubView' && !checkoutPath.includes($route.name)" type="link" @click.prevent="$router.go(-1)" class="px-0">
        <i class="feather-arrow-left c-pointer second-color" style="font-size: 26px" />
      </a-button>
      <a-button v-else-if="$route.meta && $route.meta.viewComponent === 'SubView' && checkoutPath.includes($route.name)" type="link" @click.prevent="checkoutGoBack" class="px-0">
        <i class="feather-arrow-left c-pointer second-color" style="font-size: 26px" />
      </a-button>
    </a-col>
    <a-col :span="11">
      <a-row type="flex" justify="space-between" align="middle">
        <router-link :to="{name: 'Cart'}">
          <span class="ant-badge">
            <img contain :src="`/img/menu-icons/shopping-cart.png`" style="width: 30px" />
            <sup v-if="user && cartItems && cartItems.length > 0" title="2" class="ant-scroll-number ant-badge-count" style="background-color: #52c41a;"> {{totalCartQuantity}} </sup>
          </span>
        </router-link>
        <router-link :to="{name: 'Notifications'}">
          <img contain :src="`/img/menu-icons/bell.png`" style="width: 25px" />
        </router-link>
        <router-link :to="{name: 'Account'}">
          <img v-if="user && user.image" contain :src="user.image.url" style="width: 28px; height: 28px; border-radius: 100px" />
          <img v-else contain :src="require('@/assets/image/Icon-profile@2x.png')" style="width: 30px" />
        </router-link>
      </a-row>
    </a-col>
  </a-row>
</a-layout-header>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      checkoutPath: ['Cart', 'Shipping', 'Payment', 'Confirm'],
      prevPath: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    auth() {
      return this.$store.state.auth
    },
    isAccountPage() {
      if (this.$route.name === 'Account') {
        return true
      }
      return false
    },
    cartItems() {
      return this.$store.state.cart.cartItems
    },
    totalCartQuantity() {
      return this.$store.state.cart.totalCartQuantity
    }
  },
  created() {
    if (this.user) {
      this.getCartItems()
    } else {
      this.$store.dispatch('cart/clearCartItems')
    }
  },
  methods: {
    getCartItems() {
      this.$store.dispatch('cart/getCartItems')
    },
    checkoutGoBack() {
      switch (this.$route.name) {
        case 'Cart':
          this.$router.push('/shop')
          break
        case 'Shipping':
          this.$router.push('/cart')
          break
        case 'Payment':
          this.$router.push('/checkout-shipping')
          break
        case 'Confirm':
          this.$router.push('/checkout-payment')
          break
        default:
          this.$router.push('/')
      }
    }
  }
}
</script>
