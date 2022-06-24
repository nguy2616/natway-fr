<template>
<router-link :to="{name: 'Notifications'}">
     <a-icon type="bell" style="font-size: 22px; color: gray;" class="pa-2"/>
</router-link>
</template>

<script>
export default {
  name: 'HeaderNotice',
  data() {
    return {
      loadding: false
    }
  },
  computed: {
  },
  methods: {
    fetchNotice() {
      if (this.loadding) {
        this.loadding = false
        return
      }
      this.loadding = true
      setTimeout(() => {
        this.loadding = false
      }, 2000)
    }
  }
}
</script>
