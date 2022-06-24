<template>
<div class="notification-details pa-6 pr-0">
  <a-list size="large" :data-source="listNotifications">
    <a-list-item slot="renderItem" key="item.title" slot-scope="item">
      <a-list-item-meta>
        <a-avatar style="background-color: white" slot="avatar" :src="item.url" />
        <router-link slot="title" :to="item.path">
          <h4>{{ item.title }}</h4>
        </router-link>
        <div slot="description">
          {{ item.date }}
        </div>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</div>
</template>

<script>
import dayjs from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const listNotifications = [
  { id: 1, title: 'You have received 14 new weekly reports', path: '/articles', date: '2020-10-3', url: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png' },
  { id: 2, title: 'Your recommended Qu Nini has passed the third round of interviews', path: '/articles/2', date: '2021-5-5', url: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png' },
  { id: 3, title: 'This template can distinguish multiple notification types', path: '/account', date: '2021-4-6', url: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png' },
  { id: 4, title: 'You have a message from a Naturopath', date: '2021-6-15', path: '/chat', url: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png' },
  { id: 5, title: 'Your favorite product has a new article', date: '2021-5-1', path: '/articles/1', url: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png' }
]
listNotifications.forEach(noti => {
  noti.date = dayjs(noti.date).fromNow()
})
export default {
  name: 'Notifications',
  data() {
    return {
      listNotifications
    }
  }
}
</script>
