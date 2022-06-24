<template>
<div>
  <a-input size="large" class="header--search" :placeholder="$t('search.placeholder.SearchResult')" @click.prevent="click" v-if="$route.name === 'Home'">
    <i slot="prefix" class="feather-search c-pointer second-color" style="font-size: 22px;margin-top: 6px;" />
    <i slot="suffix" class="icon-scan c-pointer second-color" style="font-size: 22px;margin-top: 7px;" />/>
  </a-input>

  <a-form action="" v-if="$route.name === 'Shop'" v-on:submit.prevent="onSearchProduct()">
    <a-form-item>
      <a-input :placeholder="$t('search.placeholder.Shop')" v-model="searchValue" ref="inputSearch" type="search" autofocus="autofocus" autocomplete="off" size="large" class="header--search" pressEnter allowClear>
        <i slot="prefix" class="feather-search c-pointer second-color" style="font-size: 22px;margin-top: 6px;" />
        <i slot="suffix" class="icon-scan c-pointer second-color" style="font-size: 22px;margin-top: 7px;" />/>
      </a-input>
    </a-form-item>
  </a-form>

  <a-form action="" v-if="$route.name === 'Remedies'" v-on:submit.prevent="onSearchRemedy()">
    <a-form-item>
      <a-input :placeholder="$t('search.placeholder.Remedies')" v-model="searchValue" ref="inputSearch" type="search" autofocus="autofocus" autocomplete="off" size="large" class="header--search" pressEnter allowClear>
        <i slot="prefix" class="feather-search c-pointer second-color" style="font-size: 22px;margin-top: 6px;" />
        <i slot="suffix" class="icon-scan c-pointer second-color" style="font-size: 22px;margin-top: 7px;" />/>
      </a-input>
    </a-form-item>
  </a-form>

  <a-form action="" v-if="$route.name === 'Naturopaths'" v-on:submit.prevent="onSearchNaturopath()">
    <a-form-item>
      <a-input :placeholder="$t('search.placeholder.Naturopaths')" v-model="searchValue" ref="inputSearch" type="search" autofocus="autofocus" autocomplete="off" size="large" class="header--search" pressEnter allowClear>
        <i slot="prefix" class="feather-search c-pointer second-color" style="font-size: 22px;margin-top: 6px;" />
        <i slot="suffix" class="icon-scan c-pointer second-color" style="font-size: 22px;margin-top: 7px;" />/>
      </a-input>
    </a-form-item>
  </a-form>

  <p v-if="searchValue && searchValue !== ''"> {{ $t("search.ResultsOfYourSearch") }}: <b class="primary-color">{{ searchValue }}</b> </p>

</div>
</template>

<script>
export default {
  name: 'HeaderSearch',
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'search'
      }),
      placeholder: this.$i18n.t('search.placeholder/home'),
      searchValue: '',
      keywords: [],
      open: false
    }
  },
  mounted() {
    console.log('this.$route', this.$route.name)
  },
  watch: {
    $route(to, from) {
      this.searchValue = ''
      // console.log('to', to)
      // console.log('from', from)
    }
  },
  methods: {
    click() {
      if (this.$route.name === 'Home') {
        this.$router.push({
          name: 'SearchResult'
        })
        this.open = true
        // this.$nextTick(() => this.$refs.focus.focus())
      } else {
        this.open = true
        // this.$nextTick(() => this.$refs.focus.focus())
      }
    },
    onSearchHome() {
      this.$refs.inputSearch.blur()
      this.$store.dispatch('search/searchAll', this.searchValue)
      this.open = false
      this.addKeywords()
    },
    onSearchProduct() {
      this.$refs.inputSearch.blur()
      this.$store.dispatch('product/getProducts', `?_sort=average_rate:desc&searchValue=${this.searchValue}`)
    },
    onSearchRemedy() {
      this.$refs.inputSearch.blur()
      this.$store.dispatch('remedy/getRemedies', `?_sort=average_rate:desc&searchValue=${this.searchValue}`)
    },
    onSearchNaturopath() {
      this.$refs.inputSearch.blur()
      this.$store.dispatch('naturopath/getNaturopath', `?_sort=average_rate:desc&searchValue=${this.searchValue}`)
    },
    handleChange() {
      this.open = false
      this.$store.dispatch('search/searchAll', this.searchValue)
    },
    clear() {
      this.searchValue = ''
      console.log('clear')
    },
    addKeywords() {
      if (this.keywords.length > 0) {
        if (!this.keywords.includes(this.searchValue)) {
          this.keywords.push(this.searchValue)
        }
      } else {
        this.keywords.push(this.searchValue)
      }
      console.log('keywords', this.keywords)
    },
    close() {
      this.open = false
    }
  }
}
</script>

<style scoped>
/* .input {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 40px;
  padding-left: 40px;
  line-height: 2;
  height: auto;
  border: none;
  border-radius: 16px;
  width: 100%;
}

.icon-search {
  font-size: 22px;
  position: absolute;
  left: 10px;
  top: 25px;
}

.icon-scan {
  font-size: 22px;
  position: absolute;
  right: 10px;
  top: 25px;
}

.icon-clear {
  position: absolute;
  right: 35px;
  top: 35px;
}

.selectbar {
  margin-top: 20px;
  width: 100%;
}

.searchbar {
  position: absolute;
  width: 100%;
  bottom: -15px;
}

.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
} */
</style>
