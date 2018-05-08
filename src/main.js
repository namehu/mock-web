// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'jquery';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI);

const bus = new Vue();

Vue.prototype.bus = bus;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
}).$mount('#app');
