import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "../components/HelloWorld"

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/Login',
    //   name: 'login',
    //   component: Login
    // },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register,
    // },
    // {
    //   path: '/Main',
    //   name: 'Main',
    //   component: Main,
      // children: [
      //   {
      //     path: '/Search',
      //     name: 'Search',
      //     component: Search,
      //   },
      // ]
    // },
  ]
})
