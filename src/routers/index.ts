import sell from './sell';
import singlePage from './singlePage';
import Loadable from 'react-loadable';
import store from '../store';
// import staticBlog from './staticBlog';

export default [
  ...sell,
  ...singlePage,
  // ...staticBlog,
  {
    component: Loadable({
      loader: () => import('../containers/blog/tag'),
      loading: () => null,
      modules: ['../containers/blog/tag'],
      webpack: () => [require.resolveWeak('../containers/blog/tag') as number],
    }),
    path: '/tag/:any',
    exact: true,
  },
  {
    component: Loadable({
      loader: () => import('../containers/blog/list'),
      loading: () => null,
      modules: ['../containers/blog/list'],
      webpack: () => [require.resolveWeak('../containers/blog/list') as number],
    }),
    path: '/blog',
    exact: true,
  },
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

