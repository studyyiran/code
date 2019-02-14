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
        path: '/sell/yourphone',
        children: [
          {
            component: asyncComponent(() => import('@/containers/brand/components/brandlist')),
            path: '/sell/yourphone/brand'
          },
          {
            component: asyncComponent(() => import('@/containers/brand/components/carrierlist')),
            path: '/sell/yourphone/carrier'
          },
          {
            component: asyncComponent(() => import('@/containers/brand/components/modellist')),
            path: '/sell/yourphone/model'
          },
          {
            component: asyncComponent(() => import('@/containers/brand/components/conditionlist')),
            path: '/sell/yourphone/condition'
          },
          {
            component: asyncComponent(() => import('@/containers/shipping')),
            path: '/sell/yourphone/shipping'
          },
          {
            component: asyncComponent(() => import('@/containers/yourpayment')),
            path: '/sell/yourphone/payment'
          },
          {
            component: asyncComponent(() => import('@/containers/youredone')),
            path: 'sell/yourphone/done'
          }
        ]
      },
      {
        component: asyncComponent(() => import('@/containers/youredone')),
        path: '/sell/done'
      },
      {
        component: asyncComponent(() => import('@/containers/final')),
        path: '/sell/final'
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
    component: asyncComponent(() => import('@/containers/home')),
    exact: true,
    path: '/',
  },
];

