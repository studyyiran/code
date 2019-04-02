import Loadable from 'react-loadable';

export default [
  {
    component: Loadable({
      loader: () => import('../containers/staticblog/what-is-a-blacklisted-phone'),
      loading: () => null,
      modules: ['../containers/staticblog/what-is-a-blacklisted-phone'],
      webpack: () => [require.resolveWeak('../containers/staticblog/what-is-a-blacklisted-phone') as number],
    }),
    exact: true,
    path: '/what-is-a-blacklisted-phone'
  },
  {
    component: Loadable({
      loader: () => import('../containers/staticblog/how-to-fix-water-damaged-iphone'),
      loading: () => null,
      modules: ['../containers/staticblog/how-to-fix-water-damaged-iphone'],
      webpack: () => [require.resolveWeak('../containers/staticblog/how-to-fix-water-damaged-iphone') as number],
    }),
    exact: true,
    path: '/how-to-fix-water-damaged-iphone'
  },
  {
    component: Loadable({
      loader: () => import('../containers/staticblog/how-to-transfer-contacts-from-android-to-android'),
      loading: () => null,
      modules: ['../containers/staticblog/how-to-transfer-contacts-from-android-to-android'],
      webpack: () => [require.resolveWeak('../containers/staticblog/how-to-transfer-contacts-from-android-to-android') as number],
    }),
    exact: true,
    path: '/how-to-transfer-contacts-from-android-to-android'
  },
  {
    component: Loadable({
      loader: () => import('../containers/staticblog/how-long-do-smartphones-last'),
      loading: () => null,
      modules: ['../containers/staticblog/how-long-do-smartphones-last'],
      webpack: () => [require.resolveWeak('../containers/staticblog/how-long-do-smartphones-last') as number],
    }),
    exact: true,
    path: '/how-long-do-smartphones-last'
  },
  {
    component: Loadable({
      loader: () => import('../containers/staticblog/how-to-tell-if-a-phone-is-unlocked'),
      loading: () => null,
      modules: ['../containers/staticblog/how-to-tell-if-a-phone-is-unlocked'],
      webpack: () => [require.resolveWeak('../containers/staticblog/how-to-tell-if-a-phone-is-unlocked') as number],
    }),
    exact: true,
    path: '/how-to-tell-if-a-phone-is-unlocked',
  },
  {
    component: Loadable({
      loader: () => import('../containers/staticblog/list'),
      loading: () => null,
      modules: ['../containers/staticblog/list'],
      webpack: () => [require.resolveWeak('../containers/staticblog/list') as number],
    }),
    exact: true,
    path: '/blog',
  },
];