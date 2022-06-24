<template>
<div class="update-profile pa-6">
  <a-form class="info" @submit.prevent="onSubmit">
    <div class="avatar mt-3 mb-5">
      <!-- avatar -->
      <a-row type="flex" justify="center">
        <a-col>
          <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" :before-upload="beforeUpload">
            <a-avatar v-if="image != null" :size="90" icon="user" :src="image.url" style="margin: 0px" />
            <a-avatar v-else-if="base64Img != null" :size="90" icon="user" :src="base64Img" style="margin: 0px" />
            <a-row type="flex" v-else>
              <img contain :src="require('@/assets/image/usericon.svg')" />
              <img class="plus" contain :src="require('@/assets/image/plus.svg')" />
            </a-row>
          </a-upload>
        </a-col>
      </a-row>
    </div>
    <!-- last name -->
    <div class="name mb-5">
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-item class="mb-0">
            <a-input v-if="this.$store.state.auth.jwt" v-model="lastName" placeholder="Last name" type="name" size="large" />
            <a-input v-else v-model="newLastname" placeholder="Last name" type="name" size="large" />
          </a-form-item>
        </a-col>
      </a-row>
      <!-- first name -->
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-item class="mb-5">
            <a-input v-model="firstName" placeholder="First name" type="name" size="large" />
          </a-form-item>
        </a-col>
      </a-row>
    </div>
    <div class="email mb-2">
      <!--DOB and email-->
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-item class="mb-3">
            <a-input v-model="birthday" :placeholder="$t('auth.DOB')" :type="typefield" @focus="switchDate" size="large" ref="date" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-item class="mb-3">
            <a-input disabled v-model="email" placeholder="Email" size="large" />
          </a-form-item>
        </a-col>
      </a-row>
      <p v-if="this.$store.state.auth.provider === 'google'" class="text-center">{{$t('auth.GoogleInfo')}}</p>
      <p v-else-if="this.$store.state.auth.provider === 'facebook'" class="text-center">{{$t('auth.FacebookInfo')}}</p>
      <p v-else-if="this.$store.state.auth.provider === 'linkedin'" class="text-center">{{$t('auth.LinkedinInfo')}}</p>
      <p v-else-if="this.$store.state.auth.provider === 'apple'" class="text-center">{{$t('auth.AppleInfo')}}</p>
    </div>
    <!--code-->
    <a-row type="flex" justify="center">
      <a-col span="24">
        <a-form-item class="mb-0">
          <!-- <a-input
              v-model="code"
              :placeholder="$t('auth.Code')"
              type="number"
              size="large"
            /> -->
          <a-select v-if="this.address === null || this.address === ''" class="code" show-search size="large" :value="postalCodeData ? (postalCodeData.address.postalCode ? postalCodeData.address.postalCode : '') + ' ' + postalCodeData.address.city + (postalCodeData.address.district ? ', ' + postalCodeData.address.district : '') : undefined" :allow-clear="true" :placeholder="$t('auth.Code')" style="width: 100%" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" @search="searchPostalCode" @change="handleSelectChange">
            <template v-for="(d, j) in this.$store.state.hereAPI.postal_code_options">
              <a-select-option :key="j" :value="j">
                {{ d.address.postalCode ? d.address.postalCode : ''}} {{ d.address.city ? d.address.city : '' }} {{ d.address.district ? ', ' + d.address.district : '' }}
              </a-select-option>
            </template>
          </a-select>
            <a-select v-else class="code" show-search size="large" :value="postalCodeData ? (postalCodeData.address.postalCode ? postalCodeData.address.postalCode : '') + ' ' + postalCodeData.address.city + (postalCodeData.address.district ? ', ' + postalCodeData.address.district : '') : this.address" :allow-clear="true" :placeholder="$t('auth.Code')" style="width: 100%" :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null" @search="searchPostalCode" @change="handleSelectChange">
            <template v-for="(d, j) in this.$store.state.hereAPI.postal_code_options">
              <a-select-option :key="j" :value="j">
                {{ d.address.postalCode ? d.address.postalCode : ''}} {{ d.address.city ? d.address.city : '' }} {{ d.address.district ? ', ' + d.address.district : '' }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col span="24">
        <a-form-item class="mb-0">
          <a-col :span=18>
            <span style="color: #707070">{{$t('auth.Switch')}}</span>
          </a-col>
          <a-col :span=6>
              <a-switch v-if="this.$store.state.auth.user.role.id === null" checked-children="OUI" un-checked-children="NON" default-un-checked @change="handleSwitch2" />
            <a-switch v-else-if="this.$store.state.auth.user.role.id === 3" checked-children="OUI" un-checked-children="NON" default-checked @change="handleSwitch" />
            <a-switch v-else checked-children="OUI" un-checked-children="NON" default-un-checked @change="handleSwitch" />
          </a-col>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col span="22">
        <a-form-item class="mt-3">
          <a-button shape="round" type="auth" block html-type="submit">
            {{ $t('auth.Continuer') }}
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
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
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i) }
  return new Blob([ia], { type: mimeString })
}
export default {
  name: 'UserProfile',
  data() {
    return {
      user: this.$store.state.auth.user,
      firstName: this.$store.state.auth.user.firstName,
      lastName: this.$store.state.auth.user.lastName,
      birthday: this.$store.state.auth.user.birthday,
      email: this.$store.state.auth.user.email,
      address: this.$store.state.auth.user.address,
      gender: '',
      description: '',
      isValidProfile: '',
      error: '',
      loading: false,
      file: null,
      role2: {
        id: 4
      },
      role: this.$store.state.auth.user.role,
      image: this.$store.state.auth.user.image,
      validImg: false,
      base64Img: null,
      typefield: 'text',
      postalCodeData: null,
      dataform: null
    }
  },
  methods: {
    onSubmit() {
      this.isValidProfile = true
      if (this.base64Img) {
        this.uploadFiles(this.base64Img)
      }
      if (this.role === null) {
        this.dataForm = {
          id: this.$store.state.auth.user.id,
          role: this.role2,
          lastName: this.lastName,
          firstName: this.firstName,
          isValidProfile: this.isValidProfile,
          title: this.gender,
          // address: this.address,
          description: this.description,
          birthday: this.birthday,
          postalCode: this.postalCodeData && this.postalCodeData.address ? this.postalCodeData.address.postalCode : '',
          cityName: this.postalCodeData && this.postalCodeData.address ? this.postalCodeData.address.city : '',
          address: this.postalCodeData && this.postalCodeData.address ? ((this.postalCodeData && this.postalCodeData.address && this.postalCodeData.address.postalCode ? this.postalCodeData.address.postalCode + ' ' : '') + this.postalCodeData.address.city + (this.postalCodeData.address.district ? ', ' + this.postalCodeData.address.district : '')) : ''
        }
      } else {
        this.dataForm = {
          id: this.$store.state.auth.user.id,
          role: this.role,
          lastName: this.lastName,
          firstName: this.firstName,
          isValidProfile: this.isValidProfile,
          title: this.gender,
          // address: this.address,
          description: this.description,
          birthday: this.birthday,
          postalCode: this.postalCodeData && this.postalCodeData.address ? this.postalCodeData.address.postalCode : '',
          cityName: this.postalCodeData && this.postalCodeData.address ? this.postalCodeData.address.city : '',
          address: this.postalCodeData && this.postalCodeData.address ? ((this.postalCodeData && this.postalCodeData.address && this.postalCodeData.address.postalCode ? this.postalCodeData.address.postalCode + ' ' : '') + this.postalCodeData.address.city + (this.postalCodeData.address.district ? ', ' + this.postalCodeData.address.district : '')) : ''
        }
      }
      this.$store
        .dispatch('auth/updateProfile', this.dataForm)
        .then(() => {
          if (this.$store.state.auth.user.isValidNC !== true && this.$store.state.auth.user.role.id === 3) {
            this.$router.push('/user-skills')
          } else if (this.$store.state.auth.user.isValidNC !== true && this.$store.state.auth.user.role.id === 4) {
            this.$router.push('/natway-chart')
          } else {
            this.$router.push('/')
          }
        })
        .catch(error => {
          this.$message.error(this.$i18n.t('auth.Error'))
          console.log('error ', error)
        })
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
        })
      }
      //  console.log(isJpgOrPng, isLt2M)
      return false
    },
    handleSwitch() {
      if (this.role.id === 3) {
        this.role.id = 4
      } else {
        this.role.id = 3
      }
    },
    handleSwitch2() {
      if (this.role2.id === 4) {
        this.role2.id = 3
      } else {
        this.role2.id = 4
      }
    },
    uploadFiles(base64file) {
      const blob = DataURIToBlob(base64file)
      const formData = new FormData()
      formData.append('files', blob)
      formData.append('ref', 'user')
      formData.append('refId', this.$store.state.auth.user.id)
      formData.append('field', 'image')
      formData.append('source', 'users-permissions')
      this.$store.dispatch('upload/upload', formData)
        .then(() => {
        })
    },
    switchDate() {
      this.typefield = 'date'
      this.$nextTick(() => this.$refs.date.focus())
    },
    searchPostalCode(query) {
      this.$store.dispatch('hereAPI/getOptions', query)
    },
    handleSelectChange(key) {
      this.postalCodeData = this.$store.state.hereAPI.postal_code_options[key]
      this.$store.dispatch('hereAPI/setSelectedOption', this.postalCodeData)
      this.$store.dispatch('hereAPI/resetOptions')
    }
  },
  created() {
    if (this.birthday != null || this.birthday === '') {
      this.typefield = 'date'
    }
    console.log(this.$store.state.auth.user)
    this.postalCodeData = this.$store.state.hereAPI.selected_item
    console.log(this.$store.state.auth.provider)
  }
}
</script>
<style scoped>
.ant-upload.ant-upload-select-picture-card {
    border-radius: 100px;
    width: 90px;
    height: 90px;
}
</style>
