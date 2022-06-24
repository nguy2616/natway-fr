<template>
<a-card :bordered="false" class="remedy__item" @click=" (e) => { $router.push({ name: `DetailsRemedy`, params: { id: remedy.id, title: remedy.name }, }) } ">
  <img class="remedy__img" :src="remedy.image.url" :alt="remedy.name" v-if="remedy.image && remedy.image.url != null" slot="cover" />
  <h3 class="remedy__title">{{ remedy.name }}</h3>
  <span class="remedy__cate">
    <span v-for="(item, i) in remedy.external_properties" :key="i">
      {{ remedy.external_properties.indexOf(item) != remedy.external_properties.length - 1 ? `${item.name},` : item.name }}
    </span>
  </span>
  <a-row type="flex" justify="end">
    <i v-if="remedy.isFavorite === true" class="fas fa-heart remedy__icon" @click.stop="removeFav(remedy)"></i>
    <i v-else class="far fa-heart remedy__icon" @click.stop="addFav(remedy)"></i>
  </a-row>
    <a-modal v-model="visible" okText="Login" @ok="handleOk">
         <p> Please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> to continue!!!  </p>
    </a-modal>
</a-card>
</template>

<script>
export default {
  name: 'RemedyItem',
  props: ['remedy'],
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
    addFav(remedy) {
      if (this.$store.state.auth.jwt) {
        this.$store.dispatch('remedy/addFavRemedy', remedy.id)
          .then(res => {
            this.user.fav_remedies = res.data.fav_remedies
            this.checkIsFavorite(remedy)
            this.$message.success('Added to favorite!')
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        this.visible = true
      }
    },
    removeFav(remedy) {
      if (this.$store.state.auth.jwt) {
        this.user.fav_remedies = this.user.fav_remedies.filter(rmd => rmd.id !== remedy.id)
        const dataForm = { id: this.user.id, fav_remedies: this.user.fav_remedies }
        this.$store.dispatch('auth/updateProfile', dataForm)
          .then(() => {
            this.checkIsFavorite(remedy)
            this.$message.success('Removed from favorite!', 2)
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        this.visible = true
      }
    },
    checkIsFavorite(remedy) {
      if (this.user.fav_remedies) {
        if (this.user.fav_remedies.some(favremedy => favremedy.id === remedy.id)) {
          remedy.isFavorite = true
        } else {
          remedy.isFavorite = false
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
