<template>
<a-card :bordered="false" class="article__item--horizontal" @click=" (e) => { $router.push({ name: `ArticleDetails`, params: { id: article.id, title: article.title }, }) } ">
  <img class="article__img" :src="article.featured_image.url" :alt="article.title" slot="cover" />
    <template v-for="(cat, i) in article.post_categories">
        <span :key="i" class="article__category mr-2">{{cat.name}}</span>
      </template>
  <h6 class="article__title">{{ article.title }}</h6>
</a-card>
</template>

<script>
export default {
  name: 'ArticleItemHorizontally',
  props: ['article']
}
</script>
