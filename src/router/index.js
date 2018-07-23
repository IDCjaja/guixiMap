import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/pages/admin'
import adminMobile from '@/pages/adminMobile'
import select from '@/pages/select'
import mobileInformation from '@/pages/mobileInformation'
import search from '@/pages/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin',
      component: admin,
    },
    {
      path: '/mobile/admin',
      name: 'adminMobile',
      component: adminMobile,
    },
    {
      path: '/mobile/select',
      name: 'select',
      component: select
    },
    {
      path: '/mobile/mobileInformation',
      name: 'mobileInformation',
      component: mobileInformation
    },
    {
      path: '/mobile/search',
      name: 'search',
      component: search
    }
  ]
})
