import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/remote',
        name: 'remote',
        component: () => import("@/views/Remote.vue"),
    },
    {
        path: '/remote-plus',
        name: 'remotePlus',
        component: () => import("@/views/RemotePlus.vue"),
    },
    {
     path: '/maintenance-local/',
     name: 'newLocalMaintenance',
     component: () => import('@/views/local/localMaintenance.vue'),
    },
    {
     path: '/maintenance-local/:id(\\d+)',
     name: 'localMaintenance',
     component: () => import('@/views/local/localMaintenance.vue'),
    },
    {
      path: '/view-remote/:id(\\d+)',
      name: 'viewRemote',
      component: () => import('@/views/remote/viewRemote.vue'),
    },
    {
        path: '/maintenance-remote/',
        name: 'newRemoteMaintenance',
        component: () => import('@/views/remote/remoteMaintenance.vue'),
       },
       {
        path: '/maintenance-remote/:id(\\d+)',
        name: 'remoteMaintenance',
        component: () => import('@/views/remote/remoteMaintenance.vue'),
       },
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})

export default router
