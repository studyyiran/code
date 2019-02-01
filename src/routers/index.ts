import asyncComponent from '@/components/asyncComponent';

export default [
  {
    component: asyncComponent(() => import('@/containers/selllayout')),
    path: '/sell',
    children: [
      {
        component: asyncComponent(() => import('@/containers/aboutyou')),
        path: '/sell/account',
      },
      {
        component: asyncComponent(() => import('@/containers/brand')),
        path: '/sell/brand',
      },
    ]
  },
  {
    // 首页
    component: asyncComponent(() => import('@/containers/home')),
    exact: true,
    path: '/',
  },
];

