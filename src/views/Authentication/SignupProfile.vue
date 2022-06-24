<template>
<div class="signup-email pa-6">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" @submit.prevent="onSubmit">
  <div class="avatar mt-3 mb-5">
          <!-- avatar -->
  <a-row type="flex" justify="center">
    <a-col>
        <a-upload name="avatar" list-type="picture-card" class="avatar-uploader"
       :show-upload-list="false"
       :before-upload="beforeUpload">
        <a-avatar v-if="base64Img != null" :size="90" icon="user" :src="base64Img" style="margin: 0px" >
        </a-avatar>
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
            <a-form-model-item has-feedback prop="lastName" class="mb-0">
              <a-input
                v-model="ruleForm.lastName"
                placeholder="Last name"
                type="name"
                size="large"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- first name -->
        <a-row type="flex" justify="center">
          <a-col span="24">
            <a-form-model-item has-feedback prop="firstName" class="mb-5">
              <a-input
                v-model="ruleForm.firstName"
                placeholder="First name"
                type="name"
                size="large"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </div>
      <div class="email mb-10">
        <!--DOB and email-->
        <a-row type="flex" justify="center">
          <a-col span="24">
            <a-form-model-item class="mb-3">
              <a-input
                v-model="ruleForm.birthday"
                :placeholder="$t('auth.DOB')"
                :type="typefield"
                @focus="switchDate"
                size="large"
                ref="date"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="center">
          <a-col span="24">
            <a-form-model-item class="mb-3">
              <a-input
                disabled
                v-model="ruleForm.email"
                placeholder="Email"
                size="large"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <p class="ml-4" style="font-size: 16px">{{$t('auth.ChangeEmail')}}</p>
      </div>
      <!--code-->
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-model-item class="mb-3">
            <!-- <a-input
              v-model="ruleForm.code"
              :placeholder="$t('auth.Code')"
              type="number"
              size="large"
            /> -->
            <a-select
              class="code"
              show-search
              size="large"
              :value="postalCodeData ? (postalCodeData.address.postalCode ? postalCodeData.address.postalCode : '') + ' ' + postalCodeData.address.city + (postalCodeData.address.district ? ', ' + postalCodeData.address.district : '') : undefined"
              :allow-clear="true"
              :placeholder="$t('auth.Code')"
              style="width: 100%"
              :default-active-first-option="false"
              :show-arrow="false"
              :filter-option="false"
              :not-found-content="null"
              @search="searchPostalCode"
              @change="handleSelectChange"
            >
              <template v-for="(d, j) in this.$store.state.hereAPI.postal_code_options">
                <a-select-option :key="j" :value="j">
                  {{ d.address.postalCode ? d.address.postalCode : ''}} {{ d.address.city ? d.address.city : '' }} {{ d.address.district ? ', ' + d.address.district : '' }}
                </a-select-option>
              </template>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
        <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-model-item has-feedback prop="password" class="mb-0">
            <a-input-password
              v-model="ruleForm.password"
              :placeholder="$t('auth.Password')"
              size="large"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="24">
          <a-form-model-item class="mb-0">
                  <a-col span="18">
                      <span style="color: #707070; font-size: 16px">{{$t('auth.Switch')}}</span
            > </a-col>
                  <a-col span="6">
                       <a-switch
              checked-children="OUI"
              un-checked-children="NON"
              default-un-checked
              @change="handleSwitch"
            /> </a-col>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="22">
          <a-form-model-item class="mt-3">
            <a-button
              shape="round"
              type="auth"
              block
              html-type="submit"
            >
              {{ $t('auth.Continuer') }}
            </a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
      </a-form-model>
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
  name: 'SignupProfile',
  data() {
    return {
      loading: false,
      value: [],
      postalCodeData: null,
      base64Img: null,
      ruleForm: {
        lastName: null,
        firstName: null,
        birthday: null,
        code: null,
        email: this.$route.params.email,
        password: null,
        validImg: false,
        role: {
          id: 4
        }
      },
      rules: {
        firstName: [
          {
            required: true,
            message: this.$i18n.t('auth.InputFirstName')
          }
        ],
        lastName: [
          {
            required: true,
            message: this.$i18n.t('auth.InputLastName')
          }
        ],
        email: [
          {
            type: 'email',
            message: this.$i18n.t('auth.ErrorEmail')
          },
          {
            required: true,
            message: this.$i18n.t('auth.InputEmail')
          }
        ],
        password: {
          required: true,
          message: this.$i18n.t('auth.InputPassword')
        }
      },
      typefield: 'text'
    }
  },
  methods: {
    onSubmit() {
      const dataForm = {
        email: this.ruleForm.email,
        password: this.ruleForm.password,
        role: this.ruleForm.role,
        lastName: this.ruleForm.lastName,
        firstName: this.ruleForm.firstName,
        birthday: this.ruleForm.birthday,
        postalCode: this.postalCodeData && this.postalCodeData.address ? this.postalCodeData.address.postalCode : '',
        cityName: this.postalCodeData && this.postalCodeData.address ? this.postalCodeData.address.city : '',
        address: this.postalCodeData && this.postalCodeData.address ? ((this.postalCodeData && this.postalCodeData.address && this.postalCodeData.address.postalCode ? this.postalCodeData.address.postalCode + ' ' : '') + this.postalCodeData.address.city + (this.postalCodeData.address.district ? ', ' + this.postalCodeData.address.district : '')) : ''
      }
      if (dataForm.role.id === 4) {
        this.$store
          .dispatch('auth/signup', dataForm)
          .then(() => {
            if (this.base64Img) {
              this.uploadFiles(this.base64Img)
            }
            this.$message.success('Sign up succesfully', 2)
            if (this.$store.state.auth.user.role.id === 3) {
              this.$router.push('/user-skills')
            } else {
              this.$router.push('/natway-chart')
            }
          })
          .catch(error => {
            this.$message.error(this.$i18n.t('auth.Error'))
            console.log('error ', error)
          })
      } else {
        if (this.base64Img) {
          this.$store
            .dispatch('auth/signup', dataForm)
            .then(() => {
              this.uploadFiles(this.base64Img)
              this.$message.success('Sign up succesfully', 2)
              if (this.$store.state.auth.user.role.id === 3) {
                this.$router.push('/user-skills')
              } else {
                this.$router.push('/natway-chart')
              }
            })
            .catch(error => {
              this.$message.error(this.$i18n.t('auth.Error'))
              console.log('error ', error)
            })
        } else {
          this.$message.error('Please add an avatar', 2)
        }
      }
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
          this.base64Img = imageUrl
        })
      }
      //  console.log(isJpgOrPng, isLt2M)
      return false
    },
    handleSwitch() {
      if (this.ruleForm.role.id === 4) {
        this.ruleForm.role.id = 3
      } else if (this.ruleForm.role.id === 3) {
        this.ruleForm.role.id = 4
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
      //  console.log(formData)
      this.$store.dispatch('upload/upload', formData)
        .then(() => {
          //  console.log(res.data)
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
    this.postalCodeData = this.$store.state.hereAPI.selected_item
  },
  watch: {
    $route(to, from) {
      if (to.path === '/signup-email') {
        this.ruleForm.lastName = null
        this.ruleForm.firstName = null
        this.ruleForm.code = null
        this.ruleForm.birthday = null
        this.ruleForm.password = null
      }
      if (from.path === '/signup-email') {
        this.ruleForm.email = this.$route.params.email
        this.postalCodeData = null
      }
    }
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
