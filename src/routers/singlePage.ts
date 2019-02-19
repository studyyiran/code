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
    path: '/why-uptrade',
  },
  {
    component: asyncComponent(() => import('@/containers/single/broken')),
    path: '/sell-broken-iphone',
  },
  {
    component: asyncComponent(() => import('@/containers/single/howmuch')),
    path: '/how-much-is-my-phone-worth',
  },
  {
    component: asyncComponent(() => import('@/containers/single/android')),
    path: '/how-to-factory-reset-android-phone',
  },
  {
    component: asyncComponent(() => import('@/containers/single/iphone')),
    path: '/how-to-factory-reset-iphone',
  },
  {
    component: asyncComponent(() => import('@/containers/single/privacypolicy')),
    path: '/privacy-policy',
  },
  {
    component: asyncComponent(() => import('@/containers/single/terms')),
    path: '/terms',
  },
  {
    component: asyncComponent(() => import('@/containers/single/howitworks')),
    path: '/sell-my-phone',
  },
]