<template>
  <div class="remedies pa-6 pr-0">
      <h1>Last remedies</h1>
      <a-row type="flex" class="flex-nowrap pr-3" style="overflow-x: scroll">
        <template v-for="(item, i) in carouselImgs">
          <router-link :key="i"  :to="{ name: `DetailsRemedy`, params: { id: item.id, title: item.nom} }">
          <a-card
            :key="i"
            hoverable
            style="width: calc((100vw / 2.2 ) - 24px - 16px)"
            class="mr-4 rounded-lg"
          >
            <img slot="cover" alt="example" :src="item.url" class="rounded-lg" style="width: calc((100vw / 2.2 ) - 24px - 16px - 2px); height: calc(-115px + 50vw)"/>
            <a-card-meta :title="item.nom" class="text-center" />
          </a-card>
          </router-link>
        </template>
      </a-row>
  </div>
</template>
<script>
export default {
  name: 'Remedies',
  data() {
    return {
      carouselImgs: [
        { id: 'achillee-millefeuille', nom: 'Achillée millefeuille', url: require('@/assets/image/plantes/achillee-millefeuille.jpg') },
        { id: 'aloes-vera', nom: 'Aloes vera', url: require('@/assets/image/plantes/aloes-vera.jpg') },
        { id: 'argousier', nom: 'Argousier', url: require('@/assets/image/plantes/argousier.jpg') },
        { id: 'armoise-commune', nom: 'Armoise commune', url: require('@/assets/image/plantes/armoise-commune.jpg') },
        { id: 'artichaut', nom: 'Artichaut', url: require('@/assets/image/plantes/artichaut.jpg') },
        { id: 'bruyere', nom: 'Bruyère', url: require('@/assets/image/plantes/bruyere.jpg') },
        { id: 'canneberge', nom: 'Canneberge', url: require('@/assets/image/plantes/canneberge.jpg') }
      ]
    }
  }
}
</script>
