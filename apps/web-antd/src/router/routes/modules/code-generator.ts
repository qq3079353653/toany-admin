import type {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'jam:qr-code',
      order: 2,
      title: '代码生成',
    },
    name: 'CodeGenerator',
    path: '/code-generator',
    children: [
      {
        name: 'Dict',
        path: '/code-generator/table-config',
        component: () => import('#/views/code-generator/table-config/index.vue'),
        meta: {
          order: 1,
          icon: 'mingcute:table-line',
          title: '表配置',
        },
      },
    ],
  },
];

export default routes;
