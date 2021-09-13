// import Vue from 'vue'
// import Router from 'vue-router'
// import test from '../components/common/test'

// 导入页面
// import searchSongList from '@/components/common/find/searchSongList.vue'
// import discover from '@/components/common/find/discover'

import Vue from 'vue'
import VueRouter from 'vue-router'

const searchSongList = () => import('../components/common/find/searchSongList')
const discover = () => import('../components/common/find/discover')
const test = () => import('../components/common/test')
const index = () => import('../components/index/index')
const indexShow = () => import('../components/index/indexShow')
const comments = () => import('../components/common/middle/comments')
const videos = () => import('../components/common/middle/videos')
const onMv = () => import('../components/common/middle/onMv')
const login = () => import('../components/common/header/login/login')

// 1.安装插件
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 2.创建路由对象
const routes = [
  {
    path: '/',
    redirect: 'indexShow'
  },
  {
    path: '/indexShow',
    component: indexShow
    // {
    //   default: indexShow,
    //   indexShow
    // }
  },
  {
    path: '/index',
    name:'index',
    components: {
      default: index,
      index
    },
    children:[
      {
        path:'/index',
        redirect:'discover'
      },
      {
        path: '/index/discover',
        name:'discover',
        components: {
          default: discover,
          discover
        }
      },
      {
        path: '/searchSongList',
        component: searchSongList
      },
      {
        path: '/comments',
        component: comments
      },
      {
        path: '/videos',
        component: videos,
        // children:[
        //   // {    
        //   //   path: '/onMv',
        //   //   name:'onMv',
        //   //   components: {
        //   //       default: onMv,
        //   //       onMv
        //   //   }
        //   // }
        // ]
      },
      {    
        path: '/onMv',
        name:'onMv',
        components: {
            default: onMv,
            onMv
        }
      },
      {    
        path: '/login',
        name:'login',
        components: {
            default: login,
            login
        }
      }
    ]
  },
  {
    path: '/test',
    component: test
  },
]
const router = new VueRouter({
  routes,
  // mode: 'history'
  // mode: 'replace'

})

// 3.导出router
export default router

// // 1.注入插件
// Vue.use(Router)

// // 2.定义路由
// const routers=[
//   {
//     path:'/searchSongList',
//     component:searchSongList
//   }
// ];

// // 3.创建路由实例
// const router = new VueRouter({
//   mode:history
// })

// 4.导出路由
// export default router

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'test',
//       component: test
//     },
//     {
//       path:'/searchSongList',
//        component:searchSongList
//     },
//     {
//       path:'/discover',
//       component:discover
//     }
//   ]
// })
