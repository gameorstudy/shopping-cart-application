<template>
  <ul>
    <li class="checked">
      <input
        type="checkbox"
        :checked="item.checked"
        @change="checkOrNot(item.id)"
      />
    </li>
    <li class="type">
      <figure>
        <img :src="item.url" :alt="item.figcaption" />
      </figure>
      <p>{{ item.figcaption }}</p>
    </li>
    <li class="price">
      ￥<span>{{ item.price ? item.price.toFixed(2) : '' }}</span>
    </li>
    <li class="amount">
      <BaseGroupButton
        :amount="item.amount"
        @reduceByOne="reduceByOne(item.id)"
        @increaseByOne="increaseByOne(item.id)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    checkOrNot(id) {
      this.$store.dispatch('cart/checkOrNot', id)
    },
    reduceByOne(id) {
      this.$store.dispatch('cart/reduceByOne', id)
    },
    increaseByOne(id) {
      this.$store.dispatch('cart/increaseByOne', id)
    }
  }
}
</script>

<style scoped>
ul {
  @apply m-0 p-0 w-full h-full flex flex-row;
}

ul li {
  @apply flex justify-center items-center;
}

ul li:not(:nth-child(2)) {
  @apply w-1/6;
}

ul li:nth-child(2) {
  @apply w-1/2;
}

ul li.type figure {
  @apply m-0 p-0 w-56 h-60;
}

ul li.type figure img {
  @apply w-full h-full border-none;
}

ul li.type p {
  @apply m-0 p-0 text-center w-1/3;
}

/* Style for group button */
ul li.amount span {
  @apply h-8 text-base mr-2 leading-8;
}

/* Style for price */
ul li.price span {
  @apply text-red-400;
}
</style>
