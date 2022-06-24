<template>
<a-modal class="product-modal" v-model="showShop" title="Basic Modal" :footer="null" :afterClose="closeShop(showShop)" width="100%" :bodyStyle="style" :centered="false">
      <div class="search-result">
  <div class="search-bar ">
    <a-form-model @submit="handleSearch" action="">
      <a-form-model-item>
        <a-input pressEnter allowClear size="large" class="header--search" ref="inputSearch" autofocus="autofocus" autocomplete="off" v-model="searchValue" :placeholder="$t('search.placeholder.SearchResult')" type="search">
          <i slot="prefix" class="feather-search c-pointer second-color" />
          <i slot="suffix" class="icon-scan c-pointer second-color" />/>
        </a-input>
      </a-form-model-item>
    </a-form-model>
    <p v-if="searchValue && searchValue !==''">{{$t('search.ResultsOfYourSearch')}}: <b class="primary-color">{{ searchValue }}</b></p>
  </div>

  <a-row type="flex" class="mt-5" v-if="searchResults.products && searchResults.products.length>0">
    <label for="Products">
      <h3>{{$t('search.Shop')}}</h3>
    </label>
    <template v-for="(product, i) in searchResults.products">
      <ProductItem :key="i" :product="product" />
    </template>
  </a-row>

</div>
    </a-modal>
</template>

<script>
import ProductItem from '@/components/Product/ProductItem'
export default {
  name: 'ShopModal',
  components: { ProductItem },
  props: ['showShow'],
  methods: {
    closeShop(value) {
      value = false
    }
  }
}
</script>

<style>

</style>
