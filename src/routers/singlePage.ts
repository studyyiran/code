import asyncComponent from '@/components/asyncComponent';

export default [
  {
    // invitation code
    component: asyncComponent(() => import('@/containers/invitation_code')),
    exact: true,
    path: '/invitationcode',
  }
]