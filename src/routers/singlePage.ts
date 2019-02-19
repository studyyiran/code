import asyncComponent from '@/components/asyncComponent';

export default [
  {
    // invitation code
    component: asyncComponent(() => import('@/containers/single/invitation_code')),
    exact: true,
    path: '/invitationcode',
  },
  {
    // faq
    component: asyncComponent(() => import('@/containers/single/faq')),
    exact: true,
    path: '/faq',
  },
  {
    component: asyncComponent(() => import('@/containers/contact')),
    exact: true,
    path: '/contact',
  },
  {
    component: asyncComponent(() => import('@/containers/single/why')),
    exact: true,
    path: '/help/why',
  },
  {
    component: asyncComponent(() => import('@/containers/single/broken')),
    path: '/blog/broken',
  },
  {
    component: asyncComponent(() => import('@/containers/single/howmuch')),
    path: '/blog/howmuch',
  },
  {
    component: asyncComponent(() => import('@/containers/single/android')),
    path: '/help/android',
  },
  {
    component: asyncComponent(() => import('@/containers/single/iphone')),
    path: '/help/iphone',
  },
  {
    component: asyncComponent(() => import('@/containers/single/howitworks')),
    path: '/sell-my-phone',
  },
]