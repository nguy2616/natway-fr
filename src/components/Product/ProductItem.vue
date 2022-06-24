<template>
<a-card hoverable :bordered="false" class="product__item" @click="(e)=> { $router.push({ name: `DetailsProduct`, params: { id: product.id, title: product.name } }) }">
  <img class="product__img" :src="product.image.url" :alt="product.name" />
  <a-card-meta>
    <h3 slot="title" class="product__title ">{{product.name}}</h3>
    <div slot="description">
      <span class="product__desc" v-for="(remedy, i) in product.remedies" :key="i">{{remedy.name}}</span>
      <h3 v-if="product.price" class="product__price">{{product.price}} EUR </h3>
    </div>
  </a-card-meta>
</a-card>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['product', 'isPlante']
}
</script>
