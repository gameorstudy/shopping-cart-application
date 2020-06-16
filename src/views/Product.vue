<template>
  <div class="product-box">
    <figure>
      <img :src="product.url" :alt="product.figcaption" />
    </figure>
    <div class="info-box">
      <p>{{ product.figcaption }}</p>
      <div class="price">
        <span class="des">价格：</span>
        ￥
        <span class="price">{{
          product.price ? product.price.toFixed(2) : ''
        }}</span>
      </div>
      <div class="amount">
        <span>数量：</span>
        <BaseGroupButton
          :amount="amount"
          @reduceByOne="reduceByOne"
          @increaseByOne="increaseByOne"
        />
      </div>
      <div class="cart">
        <template v-if="!isInCart(product.id)">
          <span class="des">加入购物车</span>
          <span class="icon" @click="addToCart">&#x1f6d2;</span>
        </template>
        <template v-else>
          <span class="info">该商品已在购物车中</span>
          <router-link :to="{ name: 'cart' }"
            ><span class="show">点击查看</span></router-link
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NProgress from 'nprogress/nprogress.js'
import store from '@/store/index.js'

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    store
      .dispatch('products/fetchProductById', routeTo.params.id)
      .then(() => {
        NProgress.done()
        NProgress.remove()
        next()
      })
      .catch(error => {
        if (error.message && error.status === '404')
          next({ name: '404', params: { resource: 'product-item' } })
        else next({ name: 'network-issue' })
      })
  },
  computed: {
    ...mapState({
      product: state => state.products.product
    }),
    ...mapGetters('cart', ['isInCart'])
  },
  data() {
    return {
      amount: 1
    }
  },
  methods: {
    reduceByOne() {
      this.amount = this.amount - 1
    },
    increaseByOne() {
      this.amount = this.amount + 1
    },
    addToCart() {
      let product = {
        amount: this.amount,
        checked: true,
        ...this.product
      }
      NProgress.start()
      this.$store.dispatch('cart/addToCart', product).then(() => {
        NProgress.done()
        this.$router.push({ name: 'cart' })
        NProgress.remove()
      })
    }
  }
}
</script>

<style scoped>
.product-box {
  @apply w-120 h-80 bg-teal-100 flex;
  min-width: 30rem;
}

.product-box figure {
  @apply m-0 p-0 w-1/2 h-full flex justify-center items-center;
}

.product-box figure img {
  @apply w-full h-64;
}

.product-box .info-box {
  @apply w-1/2 h-full flex-col;
}

.product-box .info-box p {
  @apply mt-6 py-2 px-2 w-full h-12 text-center text-xl font-bold;
  box-sizing: border-box;
}

.product-box .info-box .price {
  @apply mt-6 w-full py-2 text-right pr-4;
}

.product-box .info-box .price span {
  @apply text-base;
}

.product-box .info-box .price span.des {
  @apply text-green-500;
}

.product-box .info-box .price span.price {
  @apply text-red-500 font-bold;
}

.product-box .info-box .amount {
  @apply mt-2 w-full py-4 pr-8 flex justify-end;
}

.product-box .info-box .amount span {
  @apply h-8 text-base mr-2 leading-8;
}

.product-box .info-box .cart {
  @apply mt-2 w-full py-4 pr-8 flex justify-end;
}

.product-box .info-box .cart span.des {
  @apply h-8 text-base mr-2 leading-8;
}

.product-box .info-box .cart span.icon {
  @apply w-8 h-8 text-2xl cursor-pointer flex justify-center items-center;
}

.product-box .info-box .cart span.info {
  @apply h-8 text-xs mr-2 leading-8;
}

.product-box .info-box .cart span.show {
  @apply h-8 text-base text-green-400 leading-8;
}

.product-box .info-box .cart span.show:hover {
  @apply text-red-400 cursor-pointer;
}
</style>
