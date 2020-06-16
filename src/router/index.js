import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Product from '@/views/Product.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkIssue from '@/views/NetworkIssue.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'item/:id',
        name: 'product',
        component: Product
      }
    ]
  },
  {
    path: '/shopping-cart',
    name: 'cart',
    component: ShoppingCart
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*',
    redirect: {
      name: '404',
      params: {
        resource: 'page'
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
