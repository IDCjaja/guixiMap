import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
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
      path: '/mobile',
      name: 'mobile',
      component: adminMobile,
      children: [
        {
          path: 'admin',
          name: 'adminMobile',
          component: adminMobile,
        },
        {
          path: 'select',
          name: 'select',
          component: select
        },
        {
          path: 'mobileInformation',
          name: 'mobileInformation',
          component: mobileInformation
        },
        {
          path: 'search',
          name: 'search',
          component: search
        }
      ]
    },
    // {
    //   path: '/mobile/select',
    //   name: 'select',
    //   component: select
    // },
    // {
    //   path: '/mobile/mobileInformation',
    //   name: 'mobileInformation',
    //   component: mobileInformation
    // },
    // {
    //   path: '/mobile/search',
    //   name: 'search',
    //   component: search
    // }
  ]
})
