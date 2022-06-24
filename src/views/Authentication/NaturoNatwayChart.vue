<template>
<div class="natway-chart pa-6 pr-4">
       <a-row >
        <vue-markdown style="font-size: 15px; line-height: 20px; margin-bottom: 150px;"  v-if="charter">{{ charter }}</vue-markdown>
  </a-row>
      <a-row class="fixed-bot mt-10 px-6" type="flex" justify="center" style="background-color: white">
    <a-col span="22">
      <a-form class="info mt-8" @submit="onSubmit">
        <a-form-item class="mb-3">
          <a-button  shape="round" type="auth" block html-type="submit" >
            {{ $t('auth.Accept') }}
          </a-button>
        </a-form-item>
            <a-form-item>
          <a-button  shape="round" type="auth" block @click="refuse()" style="background-color: #282828">
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
  name: 'NaturoNatwayChart',
  components: {
    VueMarkdown
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  data() {
    return {
      position: 'top',
      isValidNC: false,
      isValidPEF: false,
      charter: this.$store.state.auth.ncNaturo
    }
  },
  created() {
    this.getCharterContents()
  },
  methods: {
    getCharterContents() {
      this.$store.dispatch('auth/getCharterContents', 2)
        .then(() => {
          this.charter = this.$store.state.auth.ncNaturo
        })
    },
    onSubmit(e) {
      e.preventDefault()
      this.isValidPEF = true
      this.isValidNC = true
      const dataForm = { id: this.$store.state.auth.user.id, isValidNC: this.isValidNC, isValidPEF: this.isValidPEF }
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
      this.isValidPEF = false
      const dataForm = { id: this.$store.state.auth.user.id, isValidNC: this.isValidNC, isValidPEF: this.isValidPEF }
      this.user = this.$store
        .dispatch('auth/updateProfile', dataForm)
        .then(() => {
          this.$router.push('/npnatway-refuse')
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
