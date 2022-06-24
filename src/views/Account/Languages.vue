<template>
  <div class="languages pa-6">
      <h1 class="text-h1 mb-5"> {{ $i18n.t(`Languages`) }} </h1>
        <a-radio-group style="width: 100%" v-model="value" @change="onChange">
            <a-row type="flex" v-for="(item) in langs" :key="item.locale">
                <a-col :span=23>
                     <span style="font-size: 16px"> {{item.label}}</span>
                </a-col>
                 <a-col :span=1>
                       <a-radio style="font-size: 15px" :value="item.locale">  </a-radio>
                 </a-col>
                 <a-divider></a-divider>
            </a-row>
              </a-radio-group>
  </div>
</template>

<script>
export default {
  name: 'Languages',
  data() {
    return {
      value: 'fr',
      langs: [
        { locale: 'fr', label: 'Français' },
        { locale: 'es', label: 'Español' },
        { locale: 'en', label: 'English' }
      ]
    }
  },
  methods: {
    onChange(e) {
      this.$i18n.locale = e.target.value
    }
  }
}
</script>

<style>
</style>
