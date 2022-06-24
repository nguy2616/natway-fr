<template>
<div>
  <ul class="step-bar">
    <template v-for="(item, i) in progressBarItems">
      <li :class="item.component === $route.name ? 'completed' : ''" :key="i">
          <span class="text-h3">
            {{ item.id }}
          </span>
          <br>
          <p v-html="item.title" class="mb-0"></p>
      </li>
    </template>
  </ul>
</div>
</template>

<script>
export default {
  name: 'CheckoutProgressBar',
  data() {
    return {
      progressBarItems: [
        { id: 1, title: 'Adresse <br />de livraison', component: 'Shipping' },
        { id: 2, title: 'Méthode <br />de paiement', component: 'Payment' },
        { id: 3, title: 'Confirmation', component: 'Confirm' }
      ]
    }
  },
  methods: {
  }
}
</script>
