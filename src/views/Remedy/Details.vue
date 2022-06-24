<template>
<div class="remedy__details" v-if="remedy">
  <div class="remedy__img">
              <img class="ml-8" :src="remedy.image && remedy.image.url" />
              <a-button class="remedy__icon"  @click.prevent="addFavorite">
          <i :class="['', 'fa-heart', isFavorite ? 'fas' : 'far']" />
        </a-button>
  </div>
  <div class="pa-4">
    <div class="remedy__info">
      <h1 class="text-h1 second-dark-color mb-2">{{ remedy.name }}</h1>
      <p class="text-body second-dark-color">{{ remedy.nameLatin }}</p>

    </div>

    <a-row type="flex" align="middle" class="mb-4" v-if="remedy.plant_family && remedy.plant_family.name">
      <h2 class="text-h2 mr-2">{{ $t("remedy.famille") }}:</h2>
      <span class="text-body second-dark-color"> {{ remedy.plant_family.name }}</span>
    </a-row>
    <a-row type="flex" align="middle" class="mb-4" v-if="remedy.drugs">
      <h2 class="text-h2 mr-2">{{ $t("remedy.drogue") }}:</h2>
      <span class="text-body second-dark-color"> {{ remedy.drugs }}</span>
    </a-row>

    <a-row type="flex" align="middle" class="mb-4" v-if="remedy.botanicalDescriptions">
      <h2 class="text-h2 mr-2">{{ $t("remedy.description_botanique") }}:</h2>
      <p class="text-body second-dark-color"> {{ remedy.botanicalDescriptions }}</p>
    </a-row>

    <a-row type="flex" align="middle" class="mb-4" v-if="remedy.mainConstituents">
      <h2 class="text-h2 mr-2">{{ $t("remedy.principaux_constituants") }}:</h2>
      <p class="text-body second-dark-color"> {{ remedy.mainConstituents }}</p>
    </a-row>

    <a-row type="flex" align="middle" class="mb-4" v-if="remedy.mainEffects">
      <h2 class="text-h2 mr-2">{{ $t("remedy.principaux_effets") }}:</h2>
      <p class="text-body second-dark-color"> {{ remedy.mainEffects }}</p>
    </a-row>

    <a-row type="flex" align="middle" class="mb-4" v-if="remedy.precautionsForUse">
      <h2 class="text-h2 mr-2">{{ $t("remedy.precautions_demploi") }}:</h2>
      <p class="text-body second-dark-color"> {{ remedy.precautionsForUse }}</p>
    </a-row>

    <div>
      <h2 class="text-h2 mt-4">{{ $t("remedy.indication") }}:</h2>
      <a-row style="flex" v-if="remedy.indications.length == 1">
        <span v-for="(item, i) in remedy.indicationss" :key="i"> {{ item.name }} </span>
      </a-row>
      <a-row style="flex" v-else>
        <span v-for="(item, i) in remedy.indications" :key="i">
          {{ item.name }} {{ remedy.indications.indexOf(item) != remedy.indications.length - 1 ? `${item.name},` : item.name }}
        </span>
      </a-row>
    </div>

    <div>
      <h2 class="text-h2 mt-4">{{ $t("remedy.external_indication") }}</h2>
      <a-row style="flex" v-if="remedy.external_indications.length == 1">
        <span v-for="(item, i) in remedy.external_indications" :key="i"> {{ item.name }} </span>
      </a-row>
      <a-row style="flex" v-else>
        <span v-for="(item, i) in remedy.external_indications" :key="i">
          {{ remedy.external_indications.indexOf(item) != remedy.external_indications.length - 1 ? `${item.name},`: item.name }}
        </span>
      </a-row>
    </div>

    <div>
      <h2 class="text-h2  mt-4">{{ $t("remedy.external_properties") }}</h2>
      <a-row style="flex" v-if="remedy.external_properties.length == 1">
        <span v-for="(item, i) in remedy.external_properties" :key="i"> {{ item.name }} </span>
      </a-row>
      <a-row style="flex" v-else>
        <span v-for="(item, i) in remedy.external_properties" :key="i">
          {{ remedy.external_properties.indexOf(item) != remedy.external_properties.length - 1 ? `${item.name},` : item.name }}
        </span>
      </a-row>
    </div>
    <div>
      <h2 class="text-h2 mt-4">{{ $t('remedy.RelativeProduct')}}</h2>
      <template v-for="(item, i) in remedy.products">
        <RelativeProduct :key="i" :product="item" />
      </template>
    </div>
  </div>
   <a-modal v-model="visible" okText="Login" @ok="handleOk">
         <p> Please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> to continue!!!  </p>
    </a-modal>
</div>
</template>

<script>
import RelativeProduct from '@/components/Remedy/RelativeProduct.vue'

export default {
  name: 'DetailsRemedy',
  components: {
    RelativeProduct
  },
  data() {
    return {
      remedy: null,
      isFavorite: null,
      visible: false
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$store.dispatch('remedy/getRemedyDetail', this.$route.params.id)
        .then((remedy) => {
          this.remedy = remedy
          this.checkIsFavorite(this.remedy)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    addFavorite() {
      if (this.$store.state.auth.jwt) {
        if (this.isFavorite !== true) {
          this.$store.dispatch('remedy/addFavRemedy', this.remedy.id)
            .then(res => {
              this.user.fav_remedies = res.data.fav_remedies
              this.checkIsFavorite(this.remedy)
              this.$message.success('Added to favorite!')
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          this.user.fav_remedies = this.user.fav_remedies.filter(remedy => remedy.id !== this.remedy.id)
          const dataForm = { id: this.user.id, fav_remedies: this.user.fav_remedies }
          this.$store.dispatch('auth/updateProfile', dataForm)
            .then(() => {
              this.checkIsFavorite(this.remedy)
              this.$message.success('Removed from favorite!', 2)
            })
            .catch(e => {
              console.log(e)
            })
        }
      } else {
        this.visible = true
      }
    },
    checkIsFavorite(remedy) {
      if (this.user.fav_remedies) {
        if (this.user.fav_remedies.some(favremedy => favremedy.id === remedy.id)) {
          this.isFavorite = true
        } else {
          this.isFavorite = false
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
