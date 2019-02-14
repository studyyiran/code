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
        component: asyncComponent(() => import('@/containers/aboutphone/brands')),
        path: '/sell/yourphone/brand'
      },
      {
        component: asyncComponent(() => import('@/containers/aboutphone/carriers')),
        path: '/sell/yourphone/carrier'
      },
      {
        component: asyncComponent(() => import('@/containers/aboutphone/models')),
        path: '/sell/yourphone/model'
      },
      {
        component: asyncComponent(() => import('@/containers/aboutphone/conditions')),
        path: '/sell/yourphone/condition'
      },
      {
        component: asyncComponent(() => import('@/containers/aboutphone/shipping')),
        path: '/sell/yourphone/shipping'
      },
      {
        component: asyncComponent(() => import('@/containers/aboutphone/payment')),
        path: '/sell/yourphone/payment'
      },
      {
        component: asyncComponent(() => import('@/containers/aboutphone/done')),
        path: '/sell/yourphone/done'
      },
      {
        component: asyncComponent(() => import('@/containers/aboutphone/checkorder')),
        path: '/sell/yourphone/checkorder'
      }
    ]
  }, {
    component: asyncComponent(() => import('@/containers/order')),
    path: '/order/:id',
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

