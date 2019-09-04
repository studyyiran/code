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
    path: '/tag/:tag',
    exact: true,
    bootstrap: async (param: { [key: string]: string }) => {
      store['blog'].tagPageListPagination = {
        tagSlug: param.tag,
        pageIndex: 0,
        pageSize: 10
      }
      await store['blog'].getTagPageList();
    }
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
    actions: [
      store['blog'].getFeatureList,
      store['blog'].getLastestList,
      store['blog'].getTagList,
    ]
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
      loader: () => import('../containers/order/container'),
      loading: () => null,
      modules: ['../containers/order/container'],
      webpack: () => [require.resolveWeak('../containers/order/container') as number],
    }),
    path: '/neworder'
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
    path: '/notfound',
  },
  {
    // 单页
    component: Loadable({
      loader: () => import('../containers/blog/detail'),
      loading: () => null,
      modules: ['../containers/blog/detail'],
      webpack: () => [require.resolveWeak('../containers/blog/detail') as number],
    }),
    exact: true,
    path: '/:slug',
    bootstrap: async (param: { [key: string]: string }) => {
      await store['blog'].getPageDetail(param.slug);
    },
    templateValue() {
      if (!store['blog'].detail) {
        return null
      }
      return {
        title: store['blog'].detail.title,
        keywords: store['blog'].detail.seoKeywords,
        description: store['blog'].detail.seoDesc,
        robots: store['blog'].detail.seoRobotsCode,
      }
    }
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
    // actions: [
    //   () => store['common'].getReviews({
    //     page: 0,
    //     pageSize: 3,
    //     order: 'desc'
    //   }),
    //   store['common'].getModuleOn
    // ]
  },
];

