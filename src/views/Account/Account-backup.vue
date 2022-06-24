<template>
<div class="account">
  <Profile />
  <a-row class="pa-6" >
     <template v-for="(item, i) in menuList">
    <template v-if="item.title == 'Language'">
      <router-link :key="`router${i}`" :to="item .path" style="color: black">
        <a-row :key="`row${i}`" type="flex" justify="start" align="middle" style="height: 50px">
          <a-col :span="20">
            <div style="display: flex">
              <div>
                <a-icon :type="item.iconType" />
              </div>
              <div class="pl-4">
                <a-select default-value="fr" v-model="$i18n.locale" style="width: 200px">
                  <a-select-option v-for="(lang, j) in langs" :key="`lang${j}`" :value="lang.locale">
                    {{ lang.label }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="text-right pl-4" style="color: #3EBDA1">
              <a-icon v-if="item.iconAllow" type="right" />
            </div>
          </a-col>
        </a-row>
      </router-link>
      <a-divider :key="`divider${i}`" v-if="item.divider" class="mt-3 mb-3" />
    </template>
    <template v-else>
      <router-link :key="`router${i}`" :to="item.path" style="color: black">
        <a-row :key="`row${i}`" type="flex" justify="start" align="middle" style="height: 50px">
          <a-col :span="20">
            <div style="display: flex">
              <div>
                <a-icon :type="item.iconType" />
              </div>
              <div class="pl-4">
                {{ item.title }}
              </div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="text-right pl-4" style="color: #3EBDA1">
              <a-icon v-if="item.iconAllow" type="right" />
            </div>
          </a-col>
        </a-row>
      </router-link>
      <a-divider :key="`divider${i}`" v-if="item.divider" class="mt-3 mb-3" />
    </template>
  </template>
  </a-row>
</div>
</template>

<script>
import Profile from '@/components/Account/Profile.vue'

export default {
  name: 'Account',
  components: { Profile },
  data() {
    return {
      menuList: [
        { path: '', iconType: 'user', iconAllow: true, divider: false, title: 'Personal Info' },
        { path: '', iconType: 'file-text', iconAllow: true, divider: true, title: 'Precautionary Employment Form' },
        { path: '/shop', iconType: 'inbox', iconAllow: true, divider: false, title: 'My favorite products' },
        { path: '/remedies', iconType: 'apple', iconAllow: true, divider: true, title: 'My favorite remedies' },
        { path: '', iconType: 'star', iconAllow: false, divider: false, title: 'Referral program' },
        { path: '', iconType: 'share-alt', iconAllow: false, divider: true, title: 'Share the app' },
        { path: '', iconType: 'global', iconAllow: false, divider: true, title: 'Language' },
        { path: '', iconType: 'tags', iconAllow: false, divider: true, title: 'Version: 20210731-3' }
      ],
      langs: [
        { locale: 'fr', label: 'Français' },
        { locale: 'es', label: 'Español' },
        { locale: 'en', label: 'English' }
      ]
    }
  }
}
</script>
