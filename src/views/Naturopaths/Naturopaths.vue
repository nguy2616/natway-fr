<template>
<div class="naturopaths px-4 container" ref="container">
  <div class="">
    <SearchBar :placeholder="$t('search.placeholder.Naturopaths')" @handleSearch="handleSearch" />
  </div>
    <a-tabs v-model="current" class="articles" type="card" size="large" @change="callback">
    <a-tab-pane :key="0" :tab="$t('All')">
        <a-row class="mt-2" type="flex">
    <template v-for="(item, i) in naturopathsList">
      <NaturopathItem :key="i" :naturopath="item" />
    </template>
  </a-row>
       <div v-if="naturopathsList.length" v-observe-visibility="scrollDown"></div>
    </a-tab-pane>
    <a-tab-pane :key="1" :tab="$t('Favorite')">
         <a-row class="mt-2" type="flex">
         <template v-for="(item, i) in fav_naturopaths">
      <NaturopathItem :key="i" :naturopath="item"  />
    </template>
         </a-row>
    </a-tab-pane>
    <a-tab-pane :key="2" :tab="$t('Online')">
         <a-row class="mt-2" type="flex">
         <template v-for="(item, i) in onlineNaturopaths">
      <NaturopathItem :key="i" :naturopath="item"  />
    </template>
         </a-row>
    </a-tab-pane>
    </a-tabs>
</div>
</template>

<script>
import NaturopathItem from '@/components/Naturopaths/NaturopathItem'
import SearchBar from '@/components/Common/SearchBar'

export default {
  name: 'Naturopaths',
  components: { NaturopathItem, SearchBar },
  data() {
    return {
      searchValue: '',
      limit: 10,
      length: 10,
      selectedSpecialities: [],
      param: '',
      current: 0,
      fav_naturopaths: []
    }
  },
  watch: {
    $route(to, from) {
      // console.log('from', from.name)
      if (from.name === 'NaturoDetails') {
        this.getNaturopaths()
      }
    }
  },
  computed: {
    naturopathsList() {
      return this.$store.state.naturopath.naturopathsList
    },
    specialities() {
      return this.$store.state.naturopath.specialities
    },
    onlineNaturopaths() {
      return this.$store.state.chat.onlineNaturopaths
    }
  },
  created() {
    this.getNaturopaths()
    this.getSpecialities()
  },
  methods: {
    handleSearch(searchValue) {
      this.current = 0
      this.searchValue = searchValue
      this.getNaturopaths()
    },
    getNaturopaths() {
      //  this.$store.dispatch('naturopath/getNaturopath', `?_where[specialities.name]=${this.name}`)
      this.$store.dispatch('naturopath/getNaturopath', `?_sort=average_rate:desc&${this.param}&_limit=${this.limit}&searchValue=${this.searchValue}`)
        .then(() => {
        //  console.log(this.naturopathsList)
          this.length = this.naturopathsList.length
          this.getOnlineNaturopath(this.onlineNaturopaths, this.naturopathsList)
          this.naturopathsList.forEach(nat => {
            this.checkIsFavorite(nat)
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getSpecialities() {
      this.$store.dispatch('naturopath/getSpecialities')
        .then(() => {
          //  console.log(this.specialities)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    scrollDown(isVisibile) {
      if (!isVisibile) {
        if (this.length >= this.limit) {
          this.limit += 10
          this.getNaturopaths()
        }
      }
    },
    sortBySpeciality(speciality, checked) {
      const { selectedSpecialities } = this
      const nextSelectedSpecialities = checked
        ? [...selectedSpecialities, speciality]
        : selectedSpecialities.filter(t => t !== speciality)
      this.param = `_where[specialities.name]=${nextSelectedSpecialities[0].name}`
      this.getNaturopaths()
    },
    getOnlineNaturopath(sendbird, fe) {
      fe.forEach(naturo => {
        sendbird.forEach(user => {
          if (naturo.id === user.id) {
            naturo.connectionStatus = 'online'
          }
        })
      })
    },
    checkIsFavorite(naturopath) {
      if (this.$store.state.auth.user.fav_naturopaths) {
        if (this.$store.state.auth.user.fav_naturopaths.some(favnaturo => favnaturo.id === naturopath.id)) {
          naturopath.isFavorite = true
          if (!this.fav_naturopaths.some(favn => favn.id === naturopath.id)) {
            this.fav_naturopaths.push(naturopath)
          }
        } else {
          naturopath.isFavorite = false
          this.fav_naturopaths = this.fav_naturopaths.filter(function(e) {
            return e.id !== naturopath.id
          })
        }
      }
    },
    callback(key) {
      this.current = key
      this.getNaturopaths()
    },
    scrollTop() {
      const container = this.$refs.containerChat
      if (container) container.scrollTop = 0
    }
  }
}
</script>
