<template>
  <div class="previous-discussions ">
    <a-card class="mb-4" style="width: 100%; border-radius: 16px" :bordered="false" v-for="(item, i) in listDiscussions" :key="i">
        <a-row style="flex">
            <a-col :span=8>
             <a-avatar :size="80" icon="user" :src="item.url" />
        </a-col>
            <a-col :span=16>
                <a-row style="flex">
                    <a-col :span=18>
                        <h3 class="text-h3"> {{ item.naturopath}}</h3>
                    </a-col>
                    <a-col :span=4><a-icon type="right" /></a-col>
                </a-row>
                <p>{{ item.content}}</p>
                <span>{{ item.date }}</span>
            </a-col>
        </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'PreviousDiscussions',
  data() {
    return {
      listDiscussions: [
        {
          id: 0,
          naturopath: 'Jackie',
          url: require('@/assets/image/avatars/jackie.jpg'),
          date: '1 minute ago',
          content:
            'Merci pour votre conseil, Merci pour votre conseil Merci pour votre conseil Merci pour votre conseil Merci pour ...'
        },
        {
          id: 1,
          naturopath: 'Gary',
          url: require('@/assets/image/avatars/gary.jpg'),
          date: '45 minutes ago',
          content:
            'Merci pour votre conseil, Merci pour votre conseil Merci pour votre conseil Merci pour votre conseil Merci pour ...'
        },
        {
          id: 2,
          naturopath: 'Natalie',
          url: require('@/assets/image/avatars/natalie.jpg'),
          date: '2 hours ago',
          content:
           'Merci pour votre conseil, Merci pour votre conseil Merci pour votre conseil Merci pour votre conseil Merci pour ...'
        },
        {
          id: 3,
          naturopath: 'Ryan',
          url: require('@/assets/image/avatars/ryan.jpg'),
          date: '2 days ago',
          content:
            'Merci pour votre conseil, Merci pour votre conseil Merci pour votre conseil Merci pour votre conseil Merci pour ...'
        },
        {
          id: 4,
          naturopath: 'Lance',
          url: require('@/assets/image/avatars/lance.jpg'),
          date: '3 weeks ago',
          content:
            'Merci pour votre conseil, Merci pour votre conseil Merci pour votre conseil Merci pour votre conseil Merci pour ...'
        }
      ]
    }
  }
}
</script>

<style>
.avt {
  margin-right: 10px;
}
</style>
