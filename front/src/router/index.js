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
        {
          path:'/Layout/crash',
          name: 'crash',
          component: () =>import('../view/Crash'),
          serverName:'闪退',
          children:[
            {
              path: '/Layout/echarts',
              name: 'echarts',
              component: () =>import('../view/Echarts'),
              serverName:'闪退统计',
              children:[]
            },
            {
              path: '/Layout/table',
              name: 'table',
              component: () =>import('../view/Table'),
              serverName:'闪退比较',
              children:[]
            }
          ]
        },
        // {
        //   path:'/layout',
        //   redirect:'/Layout/market'
        // },
        // {
        //   path: '/Layout/main',
        //   name: 'main',
        //   serverName:'地图',
        //   component: () =>import('../view/Main'),
        //   children:[],
        // },
        {
          path: '/Layout/market',
          name: 'market',
          component: () =>import('../view/market'),
          serverName:'市值榜',
          children:[]
        }
      ]
    }
  ]
})
