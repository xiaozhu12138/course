import Vue from 'vue'
import App from './App.vue';
import router from '@/router/guard';
import 'normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store';
import VueContextMenu from 'vue-contextmenu';
import BMapGL from 'vue-baidu-map';
Vue.use(VueContextMenu)
Vue.use(BMapGL,{
  ak:'wLVUpUuRhpfCgdg3wvDSURpPOWDH47rl'
})

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store

}).$mount('#app')
