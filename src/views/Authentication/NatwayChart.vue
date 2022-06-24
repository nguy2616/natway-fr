<template>
<div class="natway-chart pa-6 pr-4">
       <a-row type="flex" >
        <vue-markdown style="font-size: 15px; line-height: 20px; margin-bottom:20px" v-if="charter">{{ charter }}</vue-markdown>
  </a-row>
      <a-row class="fixed-bot mt-10 px-6" type="flex" justify="center" style="background-color: white;">
    <a-col span="22">
      <a-form class="info mt-8" @submit="onSubmit">
        <a-form-item class="mb-3">
          <a-button shape="round" type="auth" block html-type="submit">
            {{ $t('auth.Accept') }}
          </a-button>
        </a-form-item>
            <a-form-item>
          <a-button shape="round" type="auth" block @click="refuse()" style="background-color: #282828">
            {{ $t('auth.Refuse') }}
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
  name: 'NatwayChart',
  components: {
    VueMarkdown
  },
  data() {
    return {
      position: 'top',
      isValidNC: false,
      charter: this.$store.state.auth.ncUser
    }
  },
  created() {
    this.getCharterContents()
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    getCharterContents() {
      this.$store.dispatch('auth/getCharterContents', 1)
        .then(() => {
          this.charter = this.$store.state.auth.ncUser
        })
    },
    onSubmit(e) {
      e.preventDefault()
      this.isValidNC = true
      const dataForm = { id: this.$store.state.auth.user.id, isValidNC: this.isValidNC, isValidPE: true }
      this.user = this.$store
        .dispatch('auth/updateProfile', dataForm)
        .then(() => {
          this.$router.push('/welcome')
        })
        .catch((error) => {
          this.$message.error(' please try again')
          console.log('error ', error)
        })
    },
    refuse() {
      this.isValidNC = false
      const dataForm = { id: this.$store.state.auth.user.id, isValidNC: this.isValidNC }
      this.user = this.$store
        .dispatch('auth/updateProfile', dataForm)
        .then(() => {
          this.$router.push('/natway-refuse')
        })
        .catch((error) => {
          this.$message.error(' please try again')
          console.log('error ', error)
        })
    }
  }
}
</script>

<style>
</style>
