<template>
<div class="update-profile pa-6">
  <!--<a-row type="flex" justify="center">
    <div class="stepbar">
      <a-button class="donestep"></a-button>
      <a-button class="donestep" v-if="this.$store.state.auth.user && this.$store.state.auth.user.role.id===3"></a-button>
      <a-button class="nextstep"></a-button>
      <a-button class="nextstep"></a-button>
      <a-button class="nextstep"></a-button>
    </div>
  </a-row>-->
  <a-form class="info" style="width: 100%" @submit="onSubmit">
    <a-row type="flex" justify="center">
      <a-col :span=24>
        <h3 class="mt-0 mb-2" style="font-size: 16px"> {{ $t('auth.FillSpecialities') }}</h3>
        <!-- Specialities -->
        <a-form-item class="mb-5" v-if="this.$store.state.auth.user.specialities.length === 0">
          <a-select class="spec" mode="multiple" :placeholder="$t('auth.Specialities')" :value="selectedSpecialities" size="large" @change="handleSelect">
            <a-select-option v-for="(speciality, i) in specialityList" :value="speciality.id" :key="i"> {{ speciality.name }} </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="mb-5" v-else>
          <a-select class="spec" mode="multiple" :placeholder="$t('auth.Specialities')" :default-value="specialitiesName" size="large" @change="handleSelect">
            <a-select-option v-for="(speciality, i) in specialityList" :value="speciality.id" :key="i"> {{ speciality.name }} </a-select-option>
          </a-select>
        </a-form-item>
        <!-- school -->
        <a-form-item class="mt-3 mb-3" v-if="this.$store.state.auth.user.school === null">
          <a-select class="school" :show-arrow="false" show-search :placeholder="$t('auth.School')" option-filter-prop="children" :filter-option="filterOption" @change="handleSchool" style="width: 100%" size="large">
            <a-select-option v-for="(school, i) in schoolList" :key="i" :value="school.id"> {{ school.name }} </a-select-option>
            <a-select-option value="other"> Other </a-select-option>
          </a-select>
          <a-input v-if="inputSchool === true" type="text" :placeholder="$t('auth.NewSchool')" v-model="newSchool"></a-input>
        </a-form-item>
        <a-form-item class="mt-3 mb-3" v-else>
          <a-select class="school" :show-arrow="false" show-search :placeholder="$t('auth.School')" option-filter-prop="children" :filter-option="filterOption" @change="handleSchool" style="width: 100%" size="large" :default-value="this.$store.state.auth.user.school.name">
            <a-select-option v-for="(school, i) in schoolList" :key="i" :value="school.id"> {{ school.name }} </a-select-option>
            <a-select-option value="other"> Other </a-select-option>
          </a-select>
          <a-input v-if="inputSchool === true" type="text" :placeholder="$t('auth.NewSchool')" v-model="newSchool"></a-input>
        </a-form-item>
        <!-- diploma picture -->
        <h3 class="mt-5 mb-2" style="font-size: 12px"> {{ $t('auth.UploadDiploma') }}</h3>
        <div class="clearfix">
          <a-upload :file-list="fileList" listType='picture' accept="image/*,.pdf" :remove="handleRemove" :before-upload="beforeUpload">
            <img contain :src="require('@/assets/image/diploma.svg')" />
          </a-upload>
        </div>
        <!-- office -->
        <a-row type="flex" class="mt-6 mb-3">
          <a-col span="24">
            <a-form-item class="mb-0">
              <a-col :span=18>
                <span style="color: #707070; font-size: 16px">{{$t('auth.Office')}}</span>
              </a-col>
              <a-col :span=6>
                <a-switch checked-children="OUI" un-checked-children="NON" default-un-checked @change="handleSwitch" />
              </a-col>
            </a-form-item>
          </a-col>
        </a-row>
        <!--
        <a-row type="flex" justify="center" class="mt-6 mb-3">
          <a-col>
            <a-form-item class="mb-3" layout="vertical" :label=" $t('auth.Office') ">
              <a-radio-group v-model="office" size="large" button-style="solid">
                <a-radio-button value=1 class="text-center" style="width: 100px">
                  {{ $i18n.t(`Yes`) }}
                </a-radio-button>
                <a-radio-button value=0 class="text-center" style="width: 100px">
                  {{ $i18n.t(`No`) }}
                </a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        -->
        <a-row class="fixed-bot mt-10 px-6" type="flex" justify="center">
          <a-col span="22">
            <a-form-item class="mt-3">
              <a-button shape="round" type="auth" block html-type="submit"> {{ $i18n.t(`auth.Continuer`) }} </a-button>
            </a-form-item>
          </a-col>
        </a-row>
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
  name: 'ProfileSkill',
  data() {
    return {
      school: null,
      selectedSpecialities: [],
      specialitiesName: [],
      fileList: [],
      certificateImage: [],
      office: 0,
      error: '',
      newSchool: null,
      inputSchool: false
    }
  },
  computed: {
    specialityList() {
      return this.$store.state.naturopath.specialities
    },
    schoolList() {
      return this.$store.state.schools.schools
    }
    // filteredOptions() {
    //  var result = this.specialityList.filter(function(speciality) {
    //    var isSelected = false
    //    this.forEach(selectedSpeciality => {
    //      if (selectedSpeciality === speciality.id) {
    //        isSelected = true
    //      }
    //    })
    //    if (!isSelected) {
    //      return speciality
    //    }
    //  }, this.selectedSpecialities)
    //  return result
    // }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      if (this.fileList.length > 0) {
        this.uploadFiles(this.fileList)
        if (this.newSchool !== null) {
          await this.postSchool(this.newSchool)
          this.school = this.$store.state.schools.newSchool
        }
        const dataForm = { id: this.$store.state.auth.user.id, school: this.school, office: this.office, specialities: this.selectedSpecialities }
        this.user = this.$store
          .dispatch('auth/updateProfile', dataForm)
          .then(() => {
            console.log(this.$store.state.auth.user)
            if (this.$store.state.auth.user.isValidNC !== true) {
              this.$router.push('/npnatway-chart')
            } else {
              this.$router.push('/user-profile')
            }
          })
          .catch((error) => {
            this.$message.error('please try again')
            console.log('error ', error)
          })
      } else {
        this.$message.error('Please upload your diploma!!', 2)
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    handleSelect(selectedSpecialities) {
      this.selectedSpecialities = selectedSpecialities
      console.log(selectedSpecialities)
    },
    handleSwitch() {
      if (this.office === 0) {
        this.office = 1
      } else if (this.office === 1) {
        this.office = 0
      }
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    uploadFiles(files) {
      files.forEach(file => {
        getBase64(file, imageUrl => {
          const file = DataURIToBlob(imageUrl)
          const formData = new FormData()
          formData.append('files', file)
          formData.append('ref', 'user')
          formData.append('refId', this.$store.state.auth.user.id)
          formData.append('field', 'certificateImage')
          formData.append('source', 'users-permissions')
          this.$store.dispatch('upload/upload', formData)
        })
      })
    },
    getSpecialities() {
      this.$store.dispatch('naturopath/getSpecialities')
    },
    getSchools() {
      this.$store.dispatch('schools/getSchools')
    },
    handleSchool(value) {
      if (value === 'other') {
        this.inputSchool = true
      } else {
        this.inputSchool = false
        this.school = value
      }
    },
    async postSchool(value) {
      const data = { name: value }
      await this.$store.dispatch('schools/postSchool', data)
    },
    getDefaultSpecName() {
      if (this.$store.state.auth.user.specialities !== null) {
        this.$store.state.auth.user.specialities.forEach(spe => {
          this.specialitiesName.push(spe.id)
        })
      }
    }
  },
  created() {
    this.getSpecialities()
    this.getSchools()
    this.getDefaultSpecName()
  }
}
</script>
<style scoped>
.spec {
    border: 1px solid #4A5A36;
    border-radius: 4px;
    height: 110px;
}

 .ant-upload {
    width: 100%;
  }
</style>
<style>
.ant-select-selection--multiple .ant-select-selection__choice {
    text-align: center;
    padding: 0 20px 0 10px;
    background-color: #C9D3AF;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    height: 26px;
    width: 150px;
}
.ant-select-lg .ant-select-selection--multiple {
    min-height: 50px;
}
</style>
