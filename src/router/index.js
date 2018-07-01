import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
import adminMobile from '@/pages/adminMobile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin',
      component: admin
    },
    {
      path: '/mobile/admin',
      name: 'adminMobile',
      component: adminMobile
    }
  ]
})
