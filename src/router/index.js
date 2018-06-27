import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/Home'),
      redirect: 'project/list',
      children: [
        {
          path: 'project/list',
          name: 'projectList',
          component: () => import('@/components/Project/List.vue'),
        }
      ],
    },
    {
      path: '/login',
      component: () => import('@/components/Login'),
    },
    {
      path: '/register',
      component: () => import('@/components/Register'),
    },
  ],
});
