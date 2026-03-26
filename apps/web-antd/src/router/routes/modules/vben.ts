import type {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'analytics',
    path: '/analytics',
    component: () => import('#/views/_core/home/index.vue'),
    meta: {
      icon: 'ic:outline-home',
      title: '首页',
      order: 1,
      affixTab: true,
    },
  },
];

export default routes;
