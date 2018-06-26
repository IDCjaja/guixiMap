// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAMap from 'vue-amap'
import App from './App'
import router from './router'
import './stylesheets/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key:['d2deaa9c3fab926880606fed18cd53c9'],
  plugin: ['AMap.MapType'],
  uiVersion: '1.0',
  v: '1.4.4'
});


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
