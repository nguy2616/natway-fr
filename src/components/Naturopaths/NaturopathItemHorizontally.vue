<template>
<a-card class="naturopath__item--horizontal" :bordered="false" hoverable @click=" (e) => { $router.push({ name: `NaturoDetails`, params: { id: naturopath.id, title: naturopath.fullName }, }) } ">
  <a-row type="flex">
      <a-col :span=20>
         <img class="naturopath__img" :src="naturopath.image.url" :alt="naturopath.fullName" />
      </a-col>
      <a-col :span=4>
            <a-badge v-if="naturopath.connectionStatus === 'online'"   class="naturopath__status" status='success' />
             <a-badge v-else  class="naturopath__status"  status='default' />
       </a-col>
  </a-row>
   <h6 class="naturopath__title">{{ naturopath.firstName }}<br/>{{ naturopath.lastName }}</h6>
  <span v-if="naturopath.specialities.length > 0" class="naturopath__cate">{{ naturopath.specialities[0].name }}</span>
  <span class="naturopath__rate"><i class="fas fa-star" /> {{ naturopath.average_rate }}</span>
</a-card>
</template>

<script>
export default {
  name: 'NaturopathItemHorizontally',
  props: ['naturopath']
}
</script>
