<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer">
      <!-- <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
      <span>{{currUser.name}}</span> -->
      <a-icon type="user" style="font-size: 22px" class="pa-2"/>
    </span>
    <a-menu style="width: 150px" slot="overlay">
      <a-menu-item>
        <router-link to="/account">
        <a-icon type="user" />
        <span style="margin-left: 8px;">Profile</span>
        </router-link>
      </a-menu-item>
      <!-- <a-menu-item>
        <a-icon type="setting" />
        <span>setting</span>
      </a-menu-item> -->
      <a-menu-divider />
      <a-menu-item>
        <a-icon type="setting" />
        <span>20210706</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <router-link to="/login">
          <a-icon type="poweroff" />
          <span style="margin-left: 8px;">Sign out</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderAvatar',
  computed: {
    currUser() {
      return this.$store.state.account.user
    }
  }
}
</script>
