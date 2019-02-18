import asyncComponent from '@/components/asyncComponent';

export default [
  {
    // invitation code
    component: asyncComponent(() => import('@/containers/invitation_code')),
    exact: true,
    path: '/invitationcode',
  },
  {
    // faq
    component: asyncComponent(() => import('@/containers/faq')),
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
    path: '/why',
  }
]