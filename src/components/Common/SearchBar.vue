<template>
  <div class="search-bar">
    <a-form-model @submit="submit" action="javascript:void(0);">
      <a-form-model-item >
        <a-input pressEnter allowClear size="large" class="header--search" ref="inputSearch" autofocus="autofocus" autocomplete="off" v-model="searchValue"  :placeholder="placeholder && placeholder !== '' ? placeholder : $t('search.placeholder.SearchResult')" type="search">
          <i slot="prefix" class="feather-search c-pointer second-color"/>
          <i slot="suffix" class="icon-scan c-pointer second-color"/>
        </a-input>
      </a-form-model-item>
    </a-form-model>
    <p v-if="searchValue && searchValue !==''">{{$t('search.ResultsOfYourSearch')}}: <b class="primary-color">{{ searchValue }}</b></p>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['placeholder'],
  data() {
    return {
      searchValue: ''
    }
  },
  mounted() {
    // this.$refs.inputSearch.focus({ preventScroll: true })
    // this.handleReset()
  },
  watch: {
    searchValue(newValue) {
      if (newValue === '') {
        this.$emit('handleSearch', this.searchValue)
      }
    }
  },
  methods: {
    submit() {
      this.$refs.inputSearch.blur()
      console.log('SearchBar', this.searchValue)
      this.$emit('handleSearch', this.searchValue)
    }
  }
}
</script>
