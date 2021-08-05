import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.use(Element, { size: 'small', zIndex: 3000 });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
// import { request } from './network/request';

// request({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res);
// }).catch(err => {
//   // console.log(err);
// })
