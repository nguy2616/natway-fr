<template>
<div class="remedies container" ref="container">
  <div class="px-4">
    <SearchBar :placeholder="$t('search.placeholder.Remedies')" @handleSearch="handleSearch" />
  </div>
   <a-tabs v-model="current" class="articles ml-4" type="card" size="large" @change="callback">
    <a-tab-pane  :key="0" :tab="$t('All')">
        <div class="remedies-scrolls">
    <template v-for="(item, i) in remediesList">
      <RemedyItem :key="i" :remedy="item" />
    </template>
</div>
  <div v-if="remediesList.length" v-observe-visibility="scrollDown"></div>
    </a-tab-pane>
    <a-tab-pane :key="1" :tab="$t('Favorite')">
          <div class="remedies-scrolls">
    <template v-for="(item, i) in fav_remedies">
      <RemedyItem :key="i" :remedy="item" />
    </template>
</div>
  <div v-if="fav_remedies.length" v-observe-visibility="scrollDown"></div>
    </a-tab-pane>
   </a-tabs>
<!--
  <a-checkable-tag>
    <a-tag class="mr-1 py-1 px-2 rounded-xl">
      <a-icon type="sliders" style="fontsize: 15px" />
    </a-tag>
  </a-checkable-tag>
  <a-checkable-tag v-for="(category, id) in categories" :key="id" :checked="selectedCategories.indexOf(category) > -1" @change="(checked) => sortByCategory(category, checked)">
    <a-tag class="mr-1 py-1 px-2 rounded-xl">
      {{ category.name }}
    </a-tag>
  </a-checkable-tag>
-->
</div>
</template>

<script>
import RemedyItem from '@/components/Remedy/RemedyItem'
import SearchBar from '@/components/Common/SearchBar'

export default {
  name: 'Remedies',
  components: { RemedyItem, SearchBar },
  computed: {
    remediesList() {
      return this.$store.state.remedy.remediesList
    },
    categories() {
      return this.$store.state.remedy.categories
    }
  },
  data() {
    return {
      searchValue: '',
      length: 10,
      limit: 10,
      selectedCategories: [],
      param: '',
      current: 0,
      fav_remedies: []
    }
  },
  watch: {
    $route(to, from) {
      // console.log('from', from.name)
      if (from.name === 'DetailsRemedy') {
        this.getRemedies()
      }
    }
  },
  mounted() {
    this.getRemedies()
    this.getCategories()
  },
  methods: {
    handleSearch(searchValue) {
      this.current = 0
      this.searchValue = searchValue
      this.getRemedies()
    },
    getCategories() {
      this.$store.dispatch('remedy/getCategories')
        .then(() => {
          //  console.log(this.$store.state.remedy.categories)
          //  console.log(this.categories)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getRemedies() {
      this.$store.dispatch('remedy/getRemedies', `?_sort=average_rate:desc&searchValue=${this.searchValue}&${this.param}&_limit=${this.limit}`)
        .then(() => {
          this.length = this.remediesList.length
          this.remediesList.forEach(remedy => {
            this.checkIsFavorite(remedy)
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    scrollDown(isVisibile) {
      if (!isVisibile) {
        if (this.length >= this.limit) {
          this.limit += 10
          this.getRemedies()
        }
      }
    },
    sortByCategory(category, checked) {
      const { selectedCategories } = this
      const nextSelectedCategories = checked
        ? [...selectedCategories, category]
        : selectedCategories.filter((t) => t !== category)
      this.param = `_where[remedy_category.name]=${nextSelectedCategories[0].name}`
      console.log(nextSelectedCategories)
      this.getRemedies()
    },
    checkIsFavorite(remedy) {
      if (this.$store.state.auth.user.fav_remedies) {
        if (this.$store.state.auth.user.fav_remedies.some(favrmd => favrmd.id === remedy.id)) {
          remedy.isFavorite = true
          if (!this.fav_remedies.some(favn => favn.id === remedy.id)) {
            this.fav_remedies.push(remedy)
          }
        } else {
          remedy.isFavorite = false
          this.fav_remedies = this.fav_remedies.filter(function(e) {
            return e.id !== remedy.id
          })
        }
      }
    },
    callback(key) {
      this.current = key
      this.getRemedies()
    },
    scrollTop() {
      const container = this.$refs.containerChat
      if (container) container.scrollTop = 0
    }
  }
}
</script>
