<template>
  <div class="item-box">
    <figure>
      <img :src="product.url" :alt="product.figcaption" />
    </figure>
    <p :title="product.figcaption">{{ product.figcaption }}</p>
    <small
      >￥<span>{{ product.price.toFixed(2) }}</span>
    </small>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.item-box {
  @apply m-0 p-0 w-full h-full cursor-pointer;
}

.item-box figure {
  @apply m-0 p-0 w-full h-48 flex justify-center;
}

.item-box img {
  @apply block w-48 h-full;
}

.item-box p {
  text-overflow: ellipsis;
  @apply inline-block p-0 mt-3 mx-4 w-56 h-6 text-base text-center overflow-hidden whitespace-no-wrap;
}

.item-box small {
  @apply block text-center mt-3;
}

.item-box small span {
  @apply text-red-500;
}
</style>
