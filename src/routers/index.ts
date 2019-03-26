import sell from './sell';
import singlePage from './singlePage';
import Loadable from 'react-loadable';
import store from '../store';

export default [
  ...sell,
  ...singlePage,
  {
    component: Loadable({
      loader: () => import('../containers/order/checkOrderNo'),
      loading: () => null,
      modules: ['../containers/order/checkOrderNo'],
      webpack: () => [require.resolveWeak('../containers/order/checkOrderNo') as number],
    }),
    path: '/check-order',
    exact: true,
  },
  {
    component: Loadable({
      loader: () => import('../containers/order'),
      loading: () => null,
      modules: ['../containers/order'],
      webpack: () => [require.resolveWeak('../containers/order') as number],
    }),
    path: '/order'
  },
  {
    component: Loadable({
      loader: () => import('../containers/home/reviews'),
      loading: () => null,
      modules: ['../containers/home/reviews'],
      webpack: () => [require.resolveWeak('../containers/home/reviews') as number],
    }),
    exact: true,
    path: '/reviews',
    actions: [
      () => store['common'].getReviews({
        page: 0,
        pageSize: 100,
        order: 'desc'
      }),
    ]
  },
  {
    // 首页
    component: Loadable({
      loader: () => import('../containers/notfound'),
      loading: () => null,
      modules: ['../containers/notfound'],
      webpack: () => [require.resolveWeak('../containers/notfound') as number],
    }),
    exact: true,
    path: '/:any',
  },
  {
    // 首页
    component: Loadable({
      loader: () => import('../containers/home'),
      loading: () => null,
      modules: ['../containers/home'],
      webpack: () => [require.resolveWeak('../containers/home') as number],
    }),
    exact: true,
    path: '/',
    actions: [
      () => store['common'].getReviews({
        page: 0,
        pageSize: 3,
        order: 'desc'
      }),
      store['common'].getModuleOn
    ]
  },
];

