<template>
<!--<div class="relative-product my-5">
  <h5 class="text-h5 primary-color">{{ $t('remedy.RelativeProduct')}}</h5>
  <a-list :data-source="relativeproducts">
    <a-list-item slot="renderItem" slot-scope="item" @click="(e)=> { $router.push({ name: `DetailsProduct`, params: { id: item.id, title: item.name } }) }">
      <a-list-item-meta >
        <a slot="title" >{{ item.name }}</a>
        <img slot="avatar" :src="item.image.url" style="width: 80px" />
        <div slot="description">
          <p>{{item.description}}</p>
          <h3 class="product__price" v-if="product.pricce">{{product.price}} EUR</h3>
        </div>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</div>-->
<a-card hoverable :bordered="false" class="product__item" @click="(e)=> { $router.push({ name: `DetailsProduct`, params: { id: product.id, title: product.name } }) }">
  <img class="product__img" :src="product.image.url" :alt="product.name" />
  <a-card-meta>
    <h4 slot="title" class="product__title ">{{product.name}}</h4>
    <div slot="description">
      <span class="product__desc">{{product.description}}</span>
      <h3 v-if="product.price" class="product__price">{{product.price}} EUR </h3>
    </div>
  </a-card-meta>
</a-card>
</template>

<script>
export default {
  name: 'RelativeProduct',
  props: ['product']
}
</script>
