<template>
  <div class="home">
    <nav>
      <router-link :to="{ name: 'cart' }"
        ><span
          >购物车({{ lengthOfItems ? lengthOfItems : 0 }})</span
        ></router-link
      >
    </nav>
    <div class="products-box">
      <div
        class="item"
        v-for="(product, $productIndex) in products"
        :key="$productIndex"
        @click="goToProduct(product.id)"
      >
        <Item :product="product" />
      </div>
    </div>
    <div class="product-container" v-if="isProductOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Item
  },
  created() {
    this.$store.dispatch('products/fetchProducts')
  },
  data() {
    return {
      // cartAmount: 0
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.products
    }),
    ...mapGetters('cart', ['lengthOfItems']),
    isProductOpen() {
      return this.$route.name === 'product'
    }
  },
  methods: {
    goToProduct(id) {
      this.$router.push({ name: 'product', params: { id } })
    },
    close() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
.home {
  @apply relative w-full h-auto m-0 p-0 flex-col;
}

nav {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  @apply w-full h-24 relative;
}

nav span {
  @apply text-sm absolute;
  top: calc(3rem - 0.4375rem);
  right: 1rem;
}

.products-box {
  @apply mt-4 w-full bg-white_smoke flex flex-row;
  max-height: 720px;
  overflow: hidden;
}

.products-box .item {
  @apply m-0 p-0 w-64 h-72 border-none bg-lavender;
}

@media (max-width: 769px) {
  .products-box {
    @apply justify-evenly flex-wrap;
  }

  .products-box .item {
    @apply m-2;
    min-width: 16rem;
  }
}

@media (min-width: 767px) {
  .products-box {
    @apply justify-center;
  }

  .products-box .item {
    @apply m-3;
    min-width: 14rem;
  }
}

.products-box::after {
  @apply clear-both;
  zoom: 1;
}

.products-box .item:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: all 0.5s;
}

.home .product-container {
  @apply absolute left-0 top-0 w-screen h-screen flex justify-center items-center;
  background: rgba(226, 232, 240, 0.75);
}
</style>
