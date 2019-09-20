import Loadable from 'react-loadable';

export default [
  {
    // invitation code
    component: Loadable({
      loader: () => import('../containers/single/invitation_code'),
      loading: () => null,
      modules: ['../containers/single/invitation_code'],
      webpack: () => [require.resolveWeak('../containers/single/invitation_code') as number],
    }),
    exact: true,
    path: '/invitationcode',
  },
  {
    // faq
    component: Loadable({
      loader: () => import('../containers/single/faq'),
      loading: () => null,
      modules: ['../containers/single/faq'],
      webpack: () => [require.resolveWeak('../containers/single/faq') as number],
    }),
    exact: true,
    path: '/faq',
  },
  {
    component: Loadable({
      loader: () => import('../containers/contact'),
      loading: () => null,
      modules: ['../containers/contact'],
      webpack: () => [require.resolveWeak('../containers/contact') as number],
    }),
    exact: true,
    path: '/contact',
  },
  {
    component: Loadable({
      loader: () => import('../containers/otherContact'),
      loading: () => null,
      modules: ['../containers/otherContact'],
      webpack: () => [require.resolveWeak('../containers/otherContact') as number],
    }),
    exact: true,
    path: '/need-help-contact',
  },
  {
    component: Loadable({
      loader: () => import('../containers/sellOthersForm'),
      loading: () => null,
      modules: ['../containers/sellOthersForm'],
      webpack: () => [require.resolveWeak('../containers/sellOthersForm') as number],
    }),
    exact: true,
    path: '/sell-more-phone',
  },
  {
    component: Loadable({
      loader: () => import('../containers/single/why'),
      loading: () => null,
      modules: ['../containers/single/why'],
      webpack: () => [require.resolveWeak('../containers/single/why') as number],
    }),
    exact: true,
    path: '/why-uptrade',
  },
  {
    component: Loadable({
      loader: () => import('../containers/single/broken'),
      loading: () => null,
      modules: ['../containers/single/broken'],
      webpack: () => [require.resolveWeak('../containers/single/broken') as number],
    }),
    path: '/sell-broken-iphone',
  },
  {
    component: Loadable({
      loader: () => import('../containers/single/howmuch'),
      loading: () => null,
      modules: ['../containers/single/howmuch'],
      webpack: () => [require.resolveWeak('../containers/single/howmuch') as number],
    }),
    path: '/how-much-is-my-phone-worth',
  },
  {
    component: Loadable({
      loader: () => import('../containers/single/android'),
      loading: () => null,
      modules: ['../containers/single/android'],
      webpack: () => [require.resolveWeak('../containers/single/android') as number],
    }),
    path: '/how-to-factory-reset-android-phone',
  },
  {
    component: Loadable({
      loader: () => import('../containers/single/iphone'),
      loading: () => null,
      modules: ['../containers/single/iphone'],
      webpack: () => [require.resolveWeak('../containers/single/iphone') as number],
    }),
    path: '/how-to-factory-reset-iphone',
  },
  {
    component: Loadable({
      loader: () => import('../containers/single/privacypolicy'),
      loading: () => null,
      modules: ['../containers/single/privacypolicy'],
      webpack: () => [require.resolveWeak('../containers/single/privacypolicy') as number],
    }),
    path: '/privacy-policy',
  },
  {
    component: Loadable({
      loader: () => import('../containers/single/terms'),
      loading: () => null,
      modules: ['../containers/single/terms'],
      webpack: () => [require.resolveWeak('../containers/single/terms') as number],
    }),
    path: '/terms',
  },
  {
    component: Loadable({
      loader: () => import('../containers/single/howitworks'),
      loading: () => null,
      modules: ['../containers/single/howitworks'],
      webpack: () => [require.resolveWeak('../containers/single/howitworks') as number],
    }),
    path: '/sell-my-phone',
  },
  {
    component: Loadable({
      loader: () => import('../containers/single/aboutUs'),
      loading: () => null,
      modules: ['../containers/single/aboutUs'],
      webpack: () => [require.resolveWeak('../containers/single/aboutUs') as number],
    }),
    path: '/who-we-are',
  },
]