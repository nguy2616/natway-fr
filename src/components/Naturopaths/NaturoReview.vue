<template>
<a-card class="mb-3" style="width: 100%; border-radius: 16px" :bordered="false">
  <a-row>
    <a-col>
        <a-card-meta>
          <a-avatar slot="avatar" :size="80" :src="review.by_user.image.url" />
           <h3 class="text-h3" slot="title">{{review.by_user.fullName}} {{review.by_user.lastName}}</h3>
          <div slot="description">
              <a-rate :default-value="review.rate" disabled style="fontSize: 16px" />
              <br/>
            <span class="text-caption" style="color: #2E312B">{{review.comment}}</span>
          </div>
        </a-card-meta>
    </a-col>
  </a-row>
</a-card>
</template>

<script>
export default {
  name: 'NaturoReview',
  props: ['review']
}
</script>
