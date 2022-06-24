<template>
<a-card :bordered="false" class="product__relative" @click=" (e) => { $router.push({ name: `DetailsProduct`, params: { id: product.id, title: product.name }, }) } ">
  <a-row>

    <a-col>
      <img class="product__img" :src="product.image.url" :alt="product.name" />
    </a-col>
    <a-col>
      <h3 class="product__title">{{ product.name }}</h3>
      <span class="product__desc">{{product.description}}</span>
      <a-row type="flex" justify="space-between" align="bottom">
        <a-col>
          <h6 class="product__price" v-if="product.price"> {{ product.price }} EUR </h6>
          <a-rate class="product__rate" :value="product.average_rate" allow-half />
        </a-col>
        <a-col>
          <i class="product__icon feather-shopping-cart mr-2"></i>
          <i :class="['product__icon', 'fa-heart', product.isFavorite ? 'fas' : 'far']" />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</a-card>
</template>

<script>
export default {
  name: 'ProductItemRelative',
  props: ['product', 'isPlante']
}
</script>
