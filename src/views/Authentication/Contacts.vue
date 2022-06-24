<template>
<div class="contacts pa-6">
  <a-row type="flex" justify="center">
    <div class="stepbar">
      <a-button class="donestep"></a-button>
      <a-button class="donestep" v-if="this.$store.state.auth.user && this.$store.state.auth.user.role.id===3"></a-button>
      <a-button class="donestep"></a-button>
      <a-button class="donestep"></a-button>
      <a-button class="donestep"></a-button>
    </div>
  </a-row>
  <div class="content-header text-center mt-6 mb-6 mx-10">
    <h3>Invite your contacts to Natway community!</h3>
  </div>
  <a-row type="flex" justify="center" class="full-hieght">
    <a-form>
      <a-form-item>
        <template v-for="(contact, i) in contactList">
          <div :key="`row${i}`" class="mb-2" style="display: flex;">
            <a-avatar :size="50" icon="user" :src="contact.url" />
            <div style="marginLeft: 15px">{{ contact.fullName }}</div>
          </div>
        </template>
      </a-form-item>
      <a-form-item>
        <a-button size="large" type="primary" block html-type="submit" @click.prevent="inviteAll()" style="height: 40px; fontSize: 16px !important;">
           {{ $t('auth.InviteAll') }}
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="text-h6" size="large" type="primary" block html-type="submit" @click="onSubmit()" style="height: 40px">
          {{ $t('auth.Continuer') }}
        </a-button>
      </a-form-item>
    </a-form>
  </a-row>
</div>
</template>

<script>
export default {
  name: 'Contacts',
  data() {
    return {
      contactList: [
        { fullName: 'Beverly Bryant', url: require('@/assets/image/avatars/contact1.jpg') },
        { fullName: 'Todd Medina', url: require('@/assets/image/avatars/contact2.jpg') },
        { fullName: 'Vera Barrett', url: require('@/assets/image/avatars/contact3.jpg') }
      ]
    }
  },
  methods: {
    inviteAll() {
      console.log('send')
    },
    onSubmit() {
      this.$message.success(this.$i18n.t('auth.SignupSuccess'), 2)
      this.$router.push('/welcome')
    }
  }
}
</script>

<style>
</style>
