<template>
  <div class="natway-refuse pa-6 pr-4">
      <a-row type="flex">
            <vue-markdown style="font-size: 15px; line-height: 20px; margin-bottom:20px" v-if="charter">{{ charter }}</vue-markdown>
    </a-row>
      <a-row class="fixed-bot mt-10 px-6" type="flex" justify="center" style="background-color: white;">
    <a-col span="22">
         <a-form class="info mt-8">
               <a-form-item class="mb-3">
          <a-button shape="round" type="auth" block @click="(e)=> { $router.push('/natway-chart') }" >
            {{ $t('auth.Return') }}
          </a-button>
               </a-form-item>
            <a-form-item>
          <a-button shape="round" type="auth" block @click="cancelRegistration" style="background-color: #282828">
            {{ $t('auth.CancalRegistration') }}
          </a-button>
            </a-form-item>
         </a-form>
    </a-col>
  </a-row>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'NatwayChartRefuse',
  data() {
    return {
      charter: this.$store.state.auth.rfUser
    }
  },
  components: {
    VueMarkdown
  },
  created() {
    this.getCharterContents()
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    getCharterContents() {
      this.$store.dispatch('auth/getCharterContents', 3)
        .then(() => {
          this.charter = this.$store.state.auth.rfUser
        })
    },
    cancelRegistration() {
      this.$store.dispatch('auth/deleteAccount', this.$store.state.auth.user.id)
        .then(() => {
          this.$store.dispatch('auth/logout')
            .then(() => {
              this.$router.push('/')
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
