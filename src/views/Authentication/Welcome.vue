<template>
  <div class="welcome pa-6">
      <div class="pa-10" >
          <h1 style="color: #4A5A36;">Bienvenue sur Natway!</h1>
      </div>
      <div class="pa-10">
          <p style="color: #282828">Maintenant que vous êtes inscrit(e) vous allez pouvoir demander conseil à nos naturopathes et/ou acheter les compléments alimentaires correspondants à vos besoins.</p>
      </div>
      <a-row class="mt-5 mb-5" type="flex" justify="center">
          <a-col span="14"></a-col>
        <a-col span="10">
      <p class="" style="color: #92A65F">L’équipe Natway</p>
        </a-col>
      </a-row>
     <a-row type="flex" justify="center">
        <a-col span="20">
            <a-button
              shape="round"
              type="auth"
              block
              html-type="submit"
              @click="(e)=> { $router.push('/') }"
            >
            {{ $t('auth.Continuer') }}
            </a-button>
        </a-col>
      </a-row>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style>

</style>
