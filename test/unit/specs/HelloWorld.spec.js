import Vue from 'vue'
import admin from '@/pages/admin'

describe('admin.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(admin)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
