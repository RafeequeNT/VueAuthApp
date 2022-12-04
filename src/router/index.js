import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import store from '../store';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: '/register',
    name: "RegisterView",
      component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue'),
    meta: { guest: true },
  },
  {
    path: '/login',
    name: "LoginView",
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: { guest: true },
  },
  {
    path: '/posts',
    name: "PostView",
    component: () => import(/* webpackChunkName: "about" */ '../views/PostView.vue'),
    meta: {requiresAuth: true},
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/posts");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
