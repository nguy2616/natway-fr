<template>
<div class="naturopath__detail pa-6" style="background: #F5F5F5;" v-if="naturopath">
  <div class="header-filter"></div>
  <a-card class="mb-5" style="width: 100%l; border-radius: 16px" :bordered="false">
    <a-row class="text-center">
      <a-col style="padding-top: 90px;">
        <a-button class="naturopath__icon" @click.prevent="addFavorite">
          <i :class="['', 'fa-heart', isFavorite === true ? 'fas' : 'far']" />
        </a-button>
        <img class="header-img" :src="naturopath.image.url" :alt="naturopath.fullName" />
         <a-badge class="naturopath__status" :status=" naturopath.connectionStatus === 'online' ? 'success' : 'default' " />
        <!--<a-avatar :size="150" icon="user" :src="naturopath.image.url" />-->
        <h1 class="text-h1 second-dark-color">{{ naturopath.fullName }}</h1>
        <p class="text-body second-dark-color">{{ naturopath.city && naturopath.city.name }}</p>
      </a-col>
    </a-row>
    <a-row class="text-center mb-5">
      <a-col :span=1></a-col>
      <a-col :span=22>
        <a-button size="large" style="background-color: white; color: #4A5A36;" type="primary" block  @click="onChat(naturopath)">
          {{ $t('naturopath.Contacter')}}</a-button>
        <!-- <a-button v-else size="large" style="background-color: white; color: #4A5A36;" type="primary" block  @click="(e)=> { $router.push({ name: `Messages`, params: { id: naturopath.id, title: naturopath.fullName, channel: this.channel } }) }">{{ $t('naturopath.Contacter')}}</a-button> -->
      </a-col>
    </a-row>
    <a-row>
      <a-row style="flex" class="mb-2">
        <a-col :span=2>
          <h3 class="text-h3">
            <a-icon class="primary-color" type="info-circle" theme="filled" />
          </h3>
        </a-col>
        <a-col :span=22>
          <h3 class="text-h3">{{ $i18n.t(`naturo.Formation`) }}</h3>
          <span v-if="naturopath.school != null" style="color: #2E312B">{{ naturopath.yearOfGraduation }} {{ naturopath.school.name }}</span>
        </a-col>
      </a-row>
      <a-row style="flex" class="mb-2">
        <a-col :span=2>
          <h3 class="text-h3">
            <a-icon class="primary-color" type="book" theme="filled" />
          </h3>
        </a-col>
        <a-col :span=22>
          <h3 class="text-h3">{{ $i18n.t(`naturo.Specialities`) }}</h3>
          <a-row style="flex" v-if="naturopath.specialities.length == 1">
            <span v-for="(item, i) in naturopath.specialities" :key="i" style="color: #2E312B">
              {{ item.name }}
            </span>
          </a-row>
          <a-row style="flex" v-else>
            <span v-for="(item, i) in naturopath.specialities" :key="i" style="color: #2E312B">
              {{ item.name }}
              <span v-if=" naturopath.specialities.indexOf(item) != naturopath.specialities.length - 1 " style="color: #2E312B">,</span>
            </span>
          </a-row>
        </a-col>
      </a-row>
      <a-row style="flex" class="mb-2">
        <a-col :span=2>
          <h3 class="text-h3">
            <!--<a-icon class="primary-color" type="key" />-->
              <img contain :src="require('@/assets/image/key.png')" style="width: 16px" />
          </h3>
        </a-col>
        <a-col :span=22>
          <h3 class="text-h3">{{ $i18n.t(`naturo.Keywords`) }}</h3>
          <a-row style="flex" v-if="naturopath.keywords.length == 1">
            <span v-for="(item, i) in naturopath.keywords" :key="i" style="color: #2E312B">
              {{ item.name }}
            </span>
          </a-row>
          <a-row style="flex" v-else>
            <span v-for="(item, i) in naturopath.keywords" :key="i" style="color: #2E312B">
              {{ item.name }}
              <span v-if=" naturopath.keywords.indexOf(item) != naturopath.keywords.length - 1" style="color: #2E312B">,</span>
            </span>
          </a-row>
        </a-col>
      </a-row>
    </a-row>
    <a-modal v-model="visible" okText="Login" @ok="handleOk">
         <p> Please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> to continue!!!  </p>
    </a-modal>
  </a-card>
  <br />
  <h1 class="text-h1 second-dark-color mb-5">{{ $t('naturopath.RecentReviews')}}</h1>
  <template v-for="(item, i) in naturopath.given_naturopath_reviews">
    <NaturoReview :key="i" :review="item" />
  </template>
  <h1 class="text-h1 second-dark-color mb-5">{{ $t('naturopath.Review')}}</h1>
  <a-card class="mb-3" style="width: 100%; border-radius: 16px" :bordered="false">
  <a-row>
    <a-col>
        <a-card-meta>
          <a-avatar slot="avatar" :size="80" :src="naturopath.image.url" />
           <h3 class="text-h3" slot="title">{{naturopath.fullName}} </h3>
          <a-rate :default-value="rate" slot="description" v-model="rate" style="fontSize: 16px" />
        </a-card-meta>
    </a-col>
  </a-row>
  <br/>
  <a-input allowClear placeholder="Put your reviews" v-model="review">
             <i slot="suffix" class="fal fa-paper-plane"  style="font-size: 20; color: #4A5A36;" @click.prevent="sendReview"/>
            </a-input>
</a-card>
    <a-modal v-model="visible" okText="Login" @ok="handleOk">
        <p> In order to put review, please <a-button style="padding: 0px; border: none" @click="handleOk"> Login/Sign-up  </a-button> </p>
  </a-modal>
</div>
</template>

<script>
import NaturoReview from '@/components/Naturopaths/NaturoReview'

export default {
  name: 'NaturoDetails',
  components: { NaturoReview },
  data() {
    return {
      naturopath: null,
      isFavorite: null,
      channel: null,
      visible: false,
      rate: 0,
      review: ''
    }
  },
  mounted() {
    this.getDetail()
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    onlineNaturopaths() {
      return this.$store.state.chat.onlineNaturopaths
    },
    groupChannelList() {
      return this.$store.state.chat.channels
    }
  },
  watch: {
    '$route'(to, from) {
      //  console.log('from.name', from.name)
      //  console.log('to.name', to)
      if (from.name === 'Naturopaths' || from.name === 'Home') {
        this.channel = null
        this.getDetail()
      }
      if (to.name === 'Naturopaths' || to.name === 'Home') {
        this.channel = null
        this.naturopath = null
      }
    }
  },
  methods: {
    onChat(naturopath) {
      if (this.$store.state.auth.jwt) {
        this.groupChannelList.forEach(channel => {
          this.chatHistory(channel)
        })
        //  console.log(this.channel)
        if (this.channel) {
          this.$router.push({ name: 'Messages', params: { id: naturopath.id, title: naturopath.fullName, channel: this.channel } })
        } else {
          this.$router.push({ name: 'Messages', params: { id: naturopath.id, title: naturopath.fullName, selectedUserId: naturopath.id } })
        }
      } else {
        this.visible = true
      }
    },
    getDetail() {
      this.$store.dispatch('naturopath/getNaturopathDetail', this.$route.params.id)
        .then((res) => {
          this.naturopath = res.data
          //  console.log(this.naturopath)
          this.checkIsFavorite(this.naturopath)
          this.checkNaturoStatus(this.naturopath)
          // console.log('list', this.groupChannelList)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    addFavorite() {
      if (this.$store.state.auth.jwt) {
        if (this.isFavorite !== true) {
          this.$store.dispatch('naturopath/addFavNaturopath', this.naturopath.id)
            .then(res => {
              this.user.fav_naturopaths = res.data.fav_naturopaths
              this.checkIsFavorite(this.naturopath)
              this.$message.success('Added to favorite!')
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          this.user.fav_naturopaths = this.user.fav_naturopaths.filter(naturo => naturo.id !== this.naturopath.id)
          const dataForm = { id: this.user.id, fav_naturopaths: this.user.fav_naturopaths }
          this.$store.dispatch('auth/updateProfile', dataForm)
            .then(() => {
              this.checkIsFavorite(this.naturopath)
              this.$message.success('Removed from favorite!', 2)
            })
            .catch(e => {
              console.log(e)
            })
        }
      } else {
        this.visible = true
      }
    },
    checkIsFavorite(naturopath) {
      if (this.user.fav_naturopaths) {
        if (this.user.fav_naturopaths.some(favnaturo => favnaturo.id === naturopath.id)) {
          this.isFavorite = true
        } else {
          this.isFavorite = false
        }
      }
    },
    chatHistory(channel) {
    //  console.log('channel', channel.members[0].userId, channel.members[1].userId)
    //  console.log(this.user.id, this.naturopath.id)
      if ((Number(channel.members[0].userId) === this.user.id && Number(channel.members[1].userId) === this.naturopath.id) || (Number(channel.members[0].userId) === this.naturopath.id && Number(channel.members[1].userId) === this.user.id)) {
        this.channel = channel
        // console.log(this.channel)
      }
    },
    checkNaturoStatus(naturopath) {
      if (this.onlineNaturopaths.some(naturo => naturo.id === naturopath.id)) {
        naturopath.connectionStatus = 'online'
        // console.log('1', naturopath)
      }
    },
    handleOk() {
      this.visible = false
      this.$router.push('/signup-email')
    },
    sendReview() {
      console.log(this.naturopath)
      if (this.$store.state.auth.jwt) {
        const content = { comment: this.review, rate: this.rate, by_user: this.user.id, to_user: this.naturopath.id }
        this.$store.dispatch('naturopath/postReview', content)
          .then(() => {
            this.getDetail()
          })
        this.rate = 0
        this.review = ''
      } else {
        this.visible = true
      }
    }
  }
}
</script>
