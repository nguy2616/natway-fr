<template>
<div class="news pa-6 pr-0">
  <a-card style="width: 100%" :bordered="false" :tab-list="tabList" :active-tab-key="activeTab" @tabChange="(key) => onTabChange(key, 'activeTab')">
    <a-list v-if="activeTab==='plants'" size="large" :data-source="listData">
      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <img width="35%" alt="logo" :src="item.url" />
        <a-list-item-meta>
          <router-link slot="title" :to="{ name: 'ArticleDetails', params: { id: item.id } }">
            <a class="font-weight-bold">{{ item.title }}</a>
          </router-link>
          <div slot="description">
            {{ item.description }}
            <br />
            <span class="font-weight-medium" style="font-size: 12px">
              <a-icon type="clock-circle" /> 4 hours ago</span>
          </div>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <div v-if="activeTab==='minerals'">
      <a-empty :description="$i18n.t('Comingsoon')" />
    </div>
    <div v-if="activeTab==='vitamins'">
      <a-empty :description="$i18n.t('Comingsoon')" />
    </div>
  </a-card>
</div>
</template>

<script>
const listData = []
for (let i = 0; i < 5; i++) {
  listData.push({
    title: `Lorem Ipsum ${i}`,
    url: require('@/assets/image/plantes/artichaut.jpg'),
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.'
  })
}

export default {
  name: 'News',
  data() {
    return {
      listData,
      tabList: [
        { key: 'plants', tab: 'Plants' },
        { key: 'minerals', tab: 'Minerals' },
        { key: 'vitamins', tab: 'Vitamins' }
      ],
      activeTab: 'plants',
      carouselImgs: [
        { url: require('@/assets/image/plantes/mauve.jpg'), title: 'Mauve' },
        { url: require('@/assets/image/plantes/aloes-vera.jpg'), title: 'Aloes vera' },
        { url: require('@/assets/image/plantes/argousier.jpg'), title: 'Argousier' },
        { url: require('@/assets/image/plantes/ginseng.jpg'), title: 'Ginseng' },
        { url: require('@/assets/image/plantes/artichaut.jpg'), title: 'Artichaut' }
      ]
    }
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type)
      this[type] = key
    }
  }
}
</script>
