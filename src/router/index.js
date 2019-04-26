import Vue from 'vue'
import Router from 'vue-router'
import Home from 'view/Home'
// 首页
import MainHome from 'view/main/Home'
import MainRouter from 'router/main'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          // 首页
          path: '',
          component: MainHome,
          children: MainRouter
        }
      ]
    }
  ]
})
