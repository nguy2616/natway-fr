<template>
<div class="precautionary-form pa-6">
  <!--<a-row type="flex" justify="center">
    <div class="stepbar">
      <a-button class="donestep"></a-button>
      <a-button class="donestep" v-if="this.$store.state.auth.user && this.$store.state.auth.user.role.id===3"></a-button>
      <a-button class="donestep"></a-button>
      <a-button class="nextstep"></a-button>
      <a-button class="nextstep"></a-button>
    </div>
  </a-row>-->
  <!--<div class="content-header text-center mt-6 mb-6 mx-10">
    <h3>{{ $i18n.t(`router.PrecautionaryForm`) }}</h3>
  </div>-->
  <a-form class="info mt-5" @submit="onSubmit">
    <a-row v-for="(item, i) in this.$store.state.auth.precaution_contents" :key="i" type="flex" align="middle" class="mb-4">
      <a-col span="14" :offset="2">
        <div style="font-size: 14px">
          {{ item.content }}
        </div>
      </a-col>
      <a-col span="7" :offset="1">
        <a-form-item class="mb-0">
          <a-switch
              class="ml-3"
              checked-children="OUI"
              un-checked-children="NON"
              default-un-checked
            />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="mt-3" type="flex" justify="center">
      <a-col span="20">
        <a-form-item class="mt-3">
          <a-button class="text-h6" shape="round" type="auth" block html-type="submit" style="height: 40px">
            {{ $i18n.t(`auth.Continuer`) }}
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</div>
</template>

<script>
export default {
  name: 'PrecautionaryForm',
  data() {
    return {
      isValidPEF: false
    }
  },
  created() {
    this.getPrecautionContents()
  },
  methods: {
    getPrecautionContents() {
      this.$store.dispatch('auth/getPrecautionContents')
    },
    onSubmit(e) {
      e.preventDefault()
      this.isValidPEF = true
      //  this.$router.push('/natway-chart')
      const dataForm = { id: this.$store.state.auth.user.id, isValidPEF: this.isValidPEF }
      this.user = this.$store
        .dispatch('auth/updateProfile', dataForm)
        .then(() => {
          if (this.$store.state.auth.user.role.id === 4) {
            this.$router.push('/natway-chart')
          } else {
            this.$router.push('/npnatway-chart')
          }
        })
        .catch(error => {
          this.$message.error(' please try again')
          console.log('error ', error)
        })
    }
  }
}
</script>

<style>
</style>
