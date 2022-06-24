<template>
<div class="signup-email pa-10">
  <p v-if="this.action === 'login'" >{{ $i18n.t(`auth.Signin`) }}</p>
  <p v-else >Signing up...</p>
</div>
</template>

<script>
export default {
  name: 'ProviderRedirect',
  data() {
    return {
      action: this.$store.state.auth.action,
      role: this.$store.state.auth.role
    }
  },
  created() {
    if (this.$route.query) {
      this.submitTokenFromProvider(this.$route.params.provider, this.$route.query)
    }
  },
  methods: {
    submitTokenFromProvider(provider, param) {
      this.$store.dispatch('auth/signupWithProvider', { provider: provider, param: param })
        .then(() => {
          if (this.action === 'login') {
            if (this.$store.state.auth.user.isValidNC) {
              this.$message.success(this.$i18n.t('auth.LoginSuccess'), 2)
              this.$router.push({
                path: '/'
              })
            } else {
              // case the user didn't sign up before
              this.$message.success(this.$i18n.t('auth.AccountDoesntExist'), 2)
              // this.$router.push({
              //    path: '/signup'
              // })
              this.action = 'signup'
              this.$store.dispatch('auth/signupWithProvider', { provider: provider, param: param })
              if (this.action === 'signup') {
                if (this.$store.state.auth.user.isValidNC) {
                  this.$message.success(this.$i18n.t('auth.LoginSuccess'), 2)
                  this.$router.push({
                    path: '/'
                  })
                } else {
                  if (this.$store.state.auth.user.role === null) {
                    const dataForm = { id: this.$store.state.auth.user.id, role: { id: 4 } }
                    console.log(provider)
                    this.$store
                      .dispatch('auth/updateProfile', dataForm)
                      .then(() => {
                        this.$router.push(
                          { path: '/user-profile' })
                      })
                      .catch((error) => {
                        this.$message.error('please try again')
                        console.log('error ', error)
                      })
                  } else {
                    this.$router.push({
                      path: '/user-profile'
                    })
                  }
                }
              }
            }
          }
        })
        .catch(error => {
          this.loading = false
          this.$message.error(this.$i18n.t('auth.AccountExist'), 5)
          this.$router.push('/signup-email')
          console.log(error)
        //  this.$router.go(-1)
        })
    }
  }
}
</script>
