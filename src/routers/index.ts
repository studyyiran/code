import asyncComponent from '@/components/asyncComponent';
import sell from './sell';
import singlePage from './singlePage';

export default [
  ...sell,
  ...singlePage,
  {
    component: asyncComponent(() => import('@/containers/order/checkOrderNo')),
    path: '/check-order',
    exact: true,
  },
  {
    component: asyncComponent(() => import('@/containers/order')),
    path: '/order'
    // children: [
    //   {
    //     component: asyncComponent(() => import('@/containers/aboutyou')),
    //     path: '/order/account',
    //   },
    //   {
    //     component: asyncComponent(() => import('@/containers/brand')),
    //     path: '/order/brand',
    //   },
    // ]
  },
  {
    component: asyncComponent(() => import('@/containers/home/reviews')),
    exact: true,
    path: '/reviews',
  },
  {
    // 首页
    component: asyncComponent(() => import('@/containers/notfound')),
    exact: true,
    path: '/:any',
  },
  {
    // 首页
    component: asyncComponent(() => import('@/containers/home')),
    exact: true,
    path: '/',
  },
];

