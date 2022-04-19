import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      icon: 'md-home'
    }
  },
  {
    path: '/inform',
    name: 'Inform',
    component: () => import('../views/About.vue'),
    meta: {
      title: '公告',
      icon: 'md-clipboard'
    }
  },
  {
    path: '/callback',
    name: 'Callback',
    component: () => import('../views/Callback.vue'),
    meta: {
      title: '反馈',
      icon: 'md-bulb'
    }
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/my'),
    meta: {
      title: '个人中心',
      icon: 'md-contact'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  // 返回 false 以取消导航
  console.log(to);
  console.log(from);
  next()
  return false
})

export default router
