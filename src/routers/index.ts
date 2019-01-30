import asyncComponent from '@/components/asyncComponent';

export default [
  {
    // 首页
    component: asyncComponent(() => import('@/containers/home')),
    exact: true,
    path: '/',
  },
];

