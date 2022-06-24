<template>
<a-card class="naturopath__item" hoverable :bordered="false" @click=" (e) => { $router.push({ name: `NaturoDetails`, params: { id: naturopath.id, title: naturopath.fullName }, }) } ">
  <a-row type="flex" class="naturopath__row">
    <a-col flex="80px">
        <a-row type="flex" class="naturopath__img_container">
          <img class="naturopath__img" :src="naturopath.image.url" :alt="naturopath.fullName" />
          <a-badge v-if="naturopath.connectionStatus === 'online'"   class="naturopath__status" status='success' />
          <a-badge v-else  class="naturopath__status" status='default' />
        </a-row>
    </a-col>
    <a-col flex="auto" class="pl-4 naturopath__info_wrapper" type="flex">
      <a-col class="naturopath__info_container" type="flex">
        <h3 class="naturopath__title">
          {{naturopath.fullName}}
        </h3>
        <span class="naturopath__cate">
          <span v-for="(item, i) in naturopath.specialities" :key="i">
            {{ naturopath.specialities.indexOf(item) != naturopath.specialities.length - 1 ? `${item.name},` : item.name }}
          </span>
        </span>
        <span class="naturopath__desc primary-color">
          <span v-for="(item, i) in naturopath.keywords" :key="i">
            {{ naturopath.keywords.indexOf(item) != naturopath.keywords.length - 1 ? `${item.name},` : item.name }}
          </span>
        </span>
      </a-col>
    </a-col>
  </a-row>
  <a-row type="flex" align="middle">
    <a-col :span="7">
      <a-rate class="naturopath__rate" :value="naturopath.average_rate" allow-half disabled />
    </a-col>
    <a-col :span="17" class="pl-4">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col>
          <span class="naturopath__desc second-color" v-if="naturopath.given_naturopath_reviews.length">
            {{ naturopath.given_naturopath_reviews.length }} {{$t('naturopath.Reviews')}}
          </span>
        </a-col>
        <a-col>
          <i v-if="naturopath.isFavorite" class="fas fa-heart naturopath__icon" @click.stop="removeFav(naturopath)"></i>
          <i v-else class="far fa-heart naturopath__icon"  @click.stop="addFav(naturopath)"></i>
        </a-col>
      </a-row>
       <a-modal v-model="visible" okText="Login" @ok="handleOk">
         <p> Please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> to continue!!!  </p>
    </a-modal>
    </a-col>
  </a-row>
</a-card>
</template>

<script>
export default {
  name: 'NaturopathItem',
  props: ['naturopath'],
  data() {
    return {
      visible: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    addFav(naturopath) {
      if (this.$store.state.auth.jwt) {
        this.$store.dispatch('naturopath/addFavNaturopath', naturopath.id)
          .then(res => {
            this.user.fav_naturopaths = res.data.fav_naturopaths
            this.checkIsFavorite(naturopath)
            this.$message.success('Added to favorite!')
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        this.visible = true
      }
    },
    removeFav(naturopath) {
      if (this.$store.state.auth.jwt) {
        this.user.fav_naturopaths = this.user.fav_naturopaths.filter(naturo => naturo.id !== naturopath.id)
        const dataForm = { id: this.user.id, fav_naturopaths: this.user.fav_naturopaths }
        this.$store.dispatch('auth/updateProfile', dataForm)
          .then(() => {
            this.checkIsFavorite(naturopath)
            this.$message.success('Removed from favorite!', 2)
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        this.visible = true
      }
    },
    checkIsFavorite(naturopath) {
      if (this.user.fav_naturopaths) {
        if (this.user.fav_naturopaths.some(favnaturo => favnaturo.id === naturopath.id)) {
          naturopath.isFavorite = true
        } else {
          naturopath.isFavorite = false
        }
      }
    },
    handleOk() {
      this.visible = false
      this.$router.push('/signup-email')
    }
  }
}
</script>
