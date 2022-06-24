<template>
  <div class="account">
    <!-- logged in -->
    <template v-if="user">
      <div class="account-login">
        <div class="profile-block">
          <!-- <Profile /> -->
          <div class="header-filter"></div>
          <a-card class="body-card pa-1" :bordered="false">
            <!--<a-row class="text-center">
        <a-col style="padding: 35px">
          <img v-if="user.image" class="header-img" :src="user.image ? user.image.url : ''" :alt="user.fullName" />
          <img v-else class="header-img" src="/img/no-avatar.png" :alt="auth.name" />
          <div class="icon-bg">
            <img src="/img/camera.png" class="icon-lg" />
          </div>
        </a-col>
      </a-row>-->
            <a-row style="padding: 35px">
              <a-col>
                <a-upload
                  class="avatar-uploader header-img"
                  name="avatar"
                  list-type="picture-card"
                  :show-upload-list="false"
                  :before-upload="beforeUpload"
                >
                  <a-avatar
                    v-if="user.image != null"
                    :size="160"
                    icon="user"
                    :src="user.image.url"
                    :alt="user.fullName"
                  />
                  <a-row type="flex" v-else>
                    <img
                      class="usericon"
                      :src="require('@/assets/image/usericon.svg')"
                      :alt="user.fullName"
                    />
                    <img
                      class="plus"
                      contain
                      :src="require('@/assets/image/camera.svg')"
                    />
                  </a-row>
                </a-upload>
              </a-col>
              <!--<a-col>
      <a-upload name="avatar" list-type="picture-card" class="avatar-uploader header-img"
       :show-upload-list="false"
       :before-upload="beforeUpload">
       <a-avatar v-if="user.image != null" :size="160" icon="user" :src="user.image.url" style="margin: 0px" />
        <a-avatar v-else-if="base64Img != null" :size="160" icon="user" :src="base64Img" style="margin: 0px" />
        <a-row type="flex" v-else>
         <img class="usericon" contain :src="require('@/assets/image/usericon.svg')" />
          <img class="pluss" contain :src="require('@/assets/image/camera.svg')" />
        </a-row>
      </a-upload>
    </a-col>-->
            </a-row>
            <a-row type="flex" class="mb-5 mt-10" justify="center">
              <h1 class="text-h1 second-dark-color">
                {{ user.firstName }} {{ user.lastName }}
              </h1>
            </a-row>
            <a-row
              type="flex"
              justify="space-between"
              align="middle"
              class="mb-2"
            >
              <a-col :span="24">
                <a-row>
                  <p
                    v-if="user.email != null"
                    class="text-body second-dark-color"
                  >
                    <img
                      contain
                      src="/img/profile-icons/envelope.png"
                      class="mr-2"
                      style="width: 15px"
                    />
                    {{ user.email }}
                  </p>
                </a-row>
                <a-row>
                  <p
                    v-if="user.email != null"
                    class="text-body second-dark-color"
                  >
                    <img
                      contain
                      src="/img/profile-icons/birthday-cake.png"
                      class="mr-2"
                      style="width: 15px"
                    />
                    {{
                      user.birthday
                        ? dayjs(user.birthday).format("DD/MM/YYYY")
                        : ""
                    }}
                  </p>
                </a-row>
              </a-col>
            </a-row>
            <a-row class="text-center">
              <a-button
                class="text-body primary-color border-none"
                type="link"
                @click="editinfo"
              >
                {{ $i18n.t(`auth.EditInfo`) }}
              </a-button>
            </a-row>
          </a-card>
        </div>
        <div class="menu-block pt-3">
          <!-- menu section -->
          <template v-for="(menuBlock, keyItem) in menuBlocks">
            <a-card
              :class="['body-card ', keyItem != 'firstBlock' ? 'mt-3' : '']"
              :bordered="false"
              :key="`menuBlock${keyItem}`"
            >
              <a-row>
                <template v-for="(item, i) in menuBlock">
                  <template>
                    <router-link
                      :key="`router${i}`"
                      :to="item.path"
                      class="second-dark-color"
                    >
                      <a-row
                        :key="`row${i}`"
                        type="flex"
                        justify="start"
                        align="middle"
                        style="height: 50px"
                      >
                        <a-col :span="20">
                          <div class="menu-label">
                            <div
                              class="icon-bg"
                              :style="`background-color: ${item.color}`"
                            >
                              <img
                                :src="`/img/profile-icons/${item.icon}.png`"
                                :class="[
                                  item.icon == 'savedArticles' ||
                                  item.icon == 'termsOfService'
                                    ? 'icon-md'
                                    : 'icon-sm'
                                ]"
                              />
                            </div>
                            <div class="pl-3">
                              {{ item.title }}
                            </div>
                          </div>
                        </a-col>
                        <a-col :span="4">
                          <div class="text-right pl-4 second-dark-color">
                            <a-icon v-if="item.iconAllow" type="right" />
                          </div>
                        </a-col>
                      </a-row>
                    </router-link>
                  </template>
                </template>
              </a-row>
              <a-row v-if="keyItem === 'thirdBlock'" class="text-center mt-3">
                <a-button
                  class="text-body primary-color border-none"
                  type="link"
                  @click.prevent="logout"
                >
                  {{ $i18n.t(`auth.Logout`) }}
                </a-button>
              </a-row>
              <a-row v-if="keyItem === 'thirdBlock'" class="text-center mt-8">
                <p class="second-color text-caption">
                  NATWAY BUILD VERSION BETA {{ releaseDate }}
                </p>
              </a-row>
            </a-card>
          </template>
        </div>
      </div>
      <!-- </div> -->
    </template>
    <!-- logged out -->
    <template v-else>
      <div class="account-logout">
        <div class="login-block pa-8">
          <a-row type="flex" justify="center">
            <a-col :span="24">
              <h1 class="text-h1 primary-dark-color mb-3">
                {{ $i18n.t(`auth.YourProfile`) }}
              </h1>
              <p class="second-dark-color mb-6">
                {{ $i18n.t(`auth.StartNatwayCommunity`) }}
              </p>
              <a-button
                class="text-h6 mb-6"
                size="large"
                type="auth"
                block
                @click="
                  e => {
                    $router.push({ path: '/signup-email' });
                  }
                "
              >
                {{ $i18n.t(`auth.Login`) }}
              </a-button>
              <a-row type="flex">
                <p class="text-caption second-dark-color mr-2">
                  {{ $i18n.t(`auth.DontHaveAccount`) }}
                </p>
                <p
                  @click="
                    e => {
                      $router.push({ path: '/signup-email' });
                    }
                  "
                  class="text-caption second-dark-color font-weight-bold text-decoration-underline mr-2"
                >
                  {{ $i18n.t(`auth.Signup`) }}
                </p>
              </a-row>
            </a-col>
          </a-row>
        </div>
        <div class="menu-block pa-4">
          <a-row>
            <template v-for="(item, l) in notLoggedInMenuBlock">
              <template>
                <router-link
                  :key="`router${l}`"
                  :to="item.path"
                  class="second-dark-color"
                >
                  <a-row
                    :key="`row${l}`"
                    type="flex"
                    justify="start"
                    align="middle"
                    style="height: 50px"
                  >
                    <a-col :span="20">
                      <div class="menu-label">
                        <div
                          class="icon-bg"
                          :style="`background-color: ${item.color}`"
                        >
                          <img
                            :src="`/img/profile-icons/${item.icon}.png`"
                            :class="[
                              item.icon == 'termsOfService'
                                ? 'icon-md'
                                : 'icon-sm'
                            ]"
                          />
                        </div>
                        <div class="pl-3">
                          {{ item.title }}
                        </div>
                      </div>
                    </a-col>
                    <a-col :span="4">
                      <div class="text-right pl-4 second-dark-color">
                        <a-icon
                          v-if="item.iconAllow"
                          type="right"
                          style="color: #92A65F"
                        />
                      </div>
                    </a-col>
                  </a-row>
                </router-link>
              </template>
            </template>
          </a-row>
          <a-row class="text-center mt-8">
            <p class="second-color text-caption">
              NATWAY BUILD VERSION BETA {{ releaseDate }}
            </p>
          </a-row>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
function DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(',')
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], { type: mimeString })
}

export default {
  name: 'Account',
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    auth() {
      return this.$store.state.auth
    }
  },
  data() {
    return {
      base64Img: null,
      releaseDate: '2021-10-11-b',
      dayjs: require('dayjs'),
      menuBlocks: {
        firstBlock: [
          {
            path: '/chat',
            icon: 'discussion',
            iconAllow: true,
            title: 'Discussion',
            color: '#41AFFF'
          },
          {
            path: '/articles',
            icon: 'savedArticles',
            iconAllow: true,
            title: 'Saved Articles',
            color: '#FFA841'
          },
          {
            path: '/account',
            icon: 'favorites',
            iconAllow: true,
            title: 'Favorites',
            color: '#FF9077'
          }
        ],
        secondBlock: [
          {
            path: '/notifications',
            icon: 'notifications',
            iconAllow: true,
            title: 'Notifications and sound',
            color: '#7278FF'
          },
          {
            path: '/languages',
            icon: 'language',
            iconAllow: true,
            title: 'Languages',
            color: '#86C072'
          }
        ],
        thirdBlock: [
          {
            path: '',
            icon: 'termsOfService',
            iconAllow: true,
            title: 'Terms of Service',
            color: '#92A65F'
          }
        ]
      },
      notLoggedInMenuBlock: [
        {
          path: '/languages',
          icon: 'language',
          iconAllow: true,
          title: 'Languages',
          color: '#86C072'
        },
        {
          path: '',
          icon: 'termsOfService',
          iconAllow: true,
          title: 'Terms of Service',
          color: '#92A65F'
        }
      ],
      langs: [
        { locale: 'fr', label: 'Français' },
        { locale: 'es', label: 'Español' },
        { locale: 'en', label: 'English' }
      ],
      options: [
        { title: 'Settings', icon: 'setting' },
        { title: 'Get help', icon: 'question-circle' },
        { title: 'Learn about Natway', icon: 'info-circle' }
      ]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$store.dispatch('chat/disconnect')
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error(this.$i18n.t('auth.Type'))
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error(this.$i18n.t('auth.Size'))
      }
      if (isJpgOrPng && isLt2M) {
        this.validImg = true
        getBase64(file, imageUrl => {
          this.image = null
          this.base64Img = imageUrl
          this.uploadFiles(this.base64Img)
        })
      }
      //  console.log(isJpgOrPng, isLt2M)
      return false
    },
    uploadFiles(base64file) {
      const blob = DataURIToBlob(base64file)
      const formData = new FormData()
      formData.append('files', blob)
      formData.append('ref', 'user')
      formData.append('refId', this.$store.state.auth.user.id)
      formData.append('field', 'image')
      formData.append('source', 'users-permissions')
      this.$store.dispatch('auth/upload', formData).then(res => {
        this.$store.state.auth.user.image = res.data[0]
      })
    },
    editinfo() {
      if (this.$store.state.auth.user.role.id === 3) {
        this.$router.push('/user-skills')
      } else {
        this.$router.push('/user-profile')
      }
    }
  }
}
</script>
<style scoped>
.ant-upload.ant-upload-select-picture-card {
  border-radius: 100px;
  width: 160px;
  height: 160px;
}
</style>
<style>
.account-login .profile-block .header-img {
  width: 160px;
  border: none;
}
.usericon {
  width: 160px;
  border-radius: 100px;
}
.ant-upload {
  border-radius: 100px;
}
.pluss {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 4.17%;
  bottom: 4.17%;
}
</style>
