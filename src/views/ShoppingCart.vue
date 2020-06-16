<template>
  <div class="shopping-cart">
    <template v-if="!lengthOfItems">
      <h4>
        亲，你的购物车空空如也，点击<router-link :to="{ name: 'Home' }"
          >首页</router-link
        >选购吧
      </h4>
    </template>
    <template v-else>
      <nav>
        <span class="title">我的购物车</span>
        <router-link :to="{ name: 'Home' }">
          <span class="navigation">继续购物&gt;</span>
        </router-link>
      </nav>
      <div class="items-box">
        <ul>
          <li>
            <ul>
              <li>
                <input
                  type="checkbox"
                  :checked="isCheckedAll"
                  @change="changeAllMode(isCheckedAll)"
                />
                <span>全选</span>
              </li>
              <li>类型</li>
              <li>价格</li>
              <li>数量</li>
            </ul>
          </li>
          <li v-for="(item, $itemIndex) in cart" :key="$itemIndex">
            <ShoppingList :item="item" />
          </li>
        </ul>
        <div class="payment-box">
          <ul>
            <li class="check">
              <input
                type="checkbox"
                :checked="isCheckedAll"
                @change="changeAllMode(isCheckedAll)"
              />
              <span>全选</span>
            </li>
            <li
              class="removeAll"
              :class="{ disabledText: isCheckedNone }"
              @click="removeCheckedItems"
            >
              删除选中的商品
            </li>
            <li class="payment">
              总额：￥<span>{{ totalAmount }}</span>
            </li>
            <li class="pay"><button>去结算</button></li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import ShoppingList from '@/components/ShoppingList.vue';
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    ShoppingList
  },
  computed: {
    ...mapState({
      cart: state => state.cart.cart
    }),
    ...mapGetters('cart', [
      'lengthOfItems',
      'totalAmount',
      'isCheckedAll',
      'isCheckedNone'
    ])
  },
  mounted() {
    // console.log(localStorage.getItem('cart'))

    // Set overflow
    const itemsBox = document.querySelector('.items-box')

    if (itemsBox) {
      const h = itemsBox.clientHeight

      if (h >= 780) itemsBox.style.overflowY = 'scroll'
      else itemsBox.style.overflow = 'hidden'
    }
  },
  methods: {
    changeAllMode(active) {
      this.$store.dispatch('cart/changeAllMode', active)
    },
    removeCheckedItems() {
      this.$store.dispatch('cart/removeCheckedItems').then(() => {
        this.$router.go(0)
      })
    }
  }
}
</script>
<style scoped>
.shopping-cart {
  @apply w-full h-full m-0 p-0;
}

.shopping-cart h4 {
  @apply text-center mt-4;
}

.shopping-cart nav {
  @apply relative h-20 mx-auto my-5;
  width: 1000px;
  background: rgb(238, 174, 202);
  background: linear-gradient(
    60deg,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
}

.shopping-cart nav span.title {
  @apply block pt-6 w-full text-center h-8 leading-8 text-2xl font-bold;
}

.shopping-cart nav span.navigation {
  @apply absolute text-black text-xs;
  bottom: 1rem;
  right: 1.5rem;
}

.shopping-cart nav span.navigation:hover {
  @apply text-red-400;
}

.shopping-cart .items-box {
  @apply mt-4 mx-auto p-0 h-auto overflow-hidden border-none;
  width: 1000px;
  max-height: 780px;
  background: rgb(251, 252, 252);
}

.shopping-cart .items-box > ul {
  @apply flex flex-col w-full h-auto m-0 p-0 border-t border-l border-black box-border;
}

.shopping-cart .items-box > ul > li {
  @apply w-full m-0 p-0;
}

.shopping-cart .items-box > ul > li:first-child {
  @apply h-16;
}

.shopping-cart .items-box > ul > li:not(:first-child) {
  @apply h-auto;
}

.shopping-cart .items-box > ul > li {
  @apply border-b border-black;
}

.shopping-cart .items-box ul li ul {
  @apply m-0 p-0 w-full h-full flex flex-row;
}

.shopping-cart .items-box ul li ul li {
  @apply flex justify-center items-center;
}

.shopping-cart .items-box ul li ul li:not(:nth-child(2)) {
  @apply w-1/6;
}

.shopping-cart .items-box ul li ul li:nth-child(2) {
  @apply w-1/2;
}

/* Style for payment */
.shopping-cart .payment-box ul {
  @apply flex w-full h-16 m-0 p-0;
  background: rgb(251, 252, 252);
}

.shopping-cart .payment-box ul li {
  @apply list-none h-full flex items-center;
}

.shopping-cart .payment-box ul li.check,
li.removeAll {
  @apply justify-center;
  width: 15%;
}

.shopping-cart .payment-box ul li.payment,
li.pay {
  @apply justify-end mr-6;
  width: 35%;
}

.shopping-cart .payment-box ul li.removeAll {
  @apply text-xs;
}

.shopping-cart .payment-box ul li.removeAll:hover {
  @apply text-red-400 cursor-pointer;
}

.shopping-cart .payment-box ul li.disabledText {
  @apply text-gray-500;
}

.shopping-cart .payment-box ul li.disabledText:hover {
  @apply cursor-default text-gray-500;
}

.shopping-cart .payment-box ul li.payment {
  @apply text-2xl font-bold;
}

.shopping-cart .payment-box ul li.payment span {
  @apply text-red-600 text-2xl font-bold;
}

.shopping-cart .payment-box ul li.pay button {
  @apply px-4 py-2 border-none text-xs outline-none;
  color: rgb(251, 252, 252);
  background: royalblue;
  font-family: 'Microsoft YaHei';
  border-radius: 0.25rem;
}

.shopping-cart .payment-box ul li.pay button:hover {
  color: royalblue;
  background: transparent;
  border: 1px solid royalblue;
}

input[type='checkbox'] {
  @apply w-4 h-4 outline-none mr-1;
}

h4 {
  font-size: 21px;
  font-weight: 700;
}
</style>
