import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import Register from '@/components/Register';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
  ],
});
