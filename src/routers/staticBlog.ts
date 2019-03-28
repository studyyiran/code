import asyncComponent from '@/components/asyncComponent';

export default [
  {
    component: asyncComponent(() => import('@/containers/staticblog/what-is-a-blacklisted-phone')),
    exact: true,
    path: '/blog/what-is-a-blacklisted-phone'
  },
  {
    component: asyncComponent(() => import('@/containers/staticblog/how-to-fix-water-damaged-iphone')),
    exact: true,
    path: '/blog/how-to-fix-water-damaged-iphone'
  },
  {
    component: asyncComponent(() => import('@/containers/staticblog/how-to-transfer-contacts-from-android-to-android')),
    exact: true,
    path: '/blog/how-to-transfer-contacts-from-android-to-android'
  },
  {
    component: asyncComponent(() => import('@/containers/staticblog/how-long-do-smartphones-last')),
    exact: true,
    path: '/blog/how-long-do-smartphones-last'
  },
  {
    component: asyncComponent(() => import('@/containers/staticblog/how-to-tell-if-a-phone-is-unlocked')),
    exact: true,
    path: '/blog/how-to-tell-if-a-phone-is-unlocked',
  },
  {
    component: asyncComponent(() => import('@/containers/staticblog/list')),
    exact: true,
    path: '/blog',
  },
];