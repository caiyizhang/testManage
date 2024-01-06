import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Weixin'
import Main from '@/view/Main'
import Layout from '@/components/Layout'
import Market from '@/view/market'
import Echarts from '@/view/Echarts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      children:[
      ]
    }
  ]
})
