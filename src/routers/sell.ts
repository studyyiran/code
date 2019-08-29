import Loadable from 'react-loadable';
import redirectComponent from '@/components/redirectComponent';

export default [
  {
    component: Loadable({
      loader: () => import('../pages/sell'),
      loading: () => null,
      modules: ['../pages/sell'],
      webpack: () => [require.resolveWeak('../pages/sell') as number],
    }),
    path: '/newsell',
  },
  {
    component: Loadable({
      loader: () => import('../containers/selllayout'),
      loading: () => null,
      modules: ['../containers/selllayout'],
      webpack: () => [require.resolveWeak('../containers/selllayout') as number],
    }),
    path: '/sell',
    children: [
      {
        component: redirectComponent('/sell/yourphone/brand'),
        path: '/sell/account',
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/brands'),
          loading: () => null,
          modules: ['../containers/aboutphone/brands'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/brands') as number],
        }),
        path: '/sell/yourphone/brand'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/carriers'),
          loading: () => null,
          modules: ['../containers/aboutphone/carriers'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/carriers') as number],
        }),
        path: '/sell/yourphone/carrier'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/models'),
          loading: () => null,
          modules: ['../containers/aboutphone/models'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/models') as number],
        }),
        path: '/sell/yourphone/model'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/other'),
          loading: () => null,
          modules: ['../containers/aboutphone/other'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/other') as number],
        }),
        path: '/sell/yourphone/other'
      },
      {
        // @ts-ignore
        component: Loadable({
          loader: () => import('../containers/aboutphone/page/condition'),
          loading: () => null,
          modules: ['../containers/aboutphone/page/condition'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/page/condition') as number],
        }),
        path: '/sell/yourphone/condition'
      },
      {
        // @ts-ignore
        component: Loadable({
          loader: () => import('../containers/aboutphone/page/shipping'),
          loading: () => null,
          modules: ['../containers/aboutphone/page/shipping'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/page/shipping') as number],
        }),
        path: '/sell/yourphone/shipping'
      },
      {
        // @ts-ignore
        component: Loadable({
          loader: () => import('../containers/aboutphone/page/payment'),
          loading: () => null,
          modules: ['../containers/aboutphone/page/payment'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/page/payment') as number],
        }),
        path: '/sell/yourphone/payment'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/done'),
          loading: () => null,
          modules: ['../containers/aboutphone/done'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/done') as number],
        }),
        path: '/sell/yourphone/done'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/checkorder'),
          loading: () => null,
          modules: ['../containers/aboutphone/checkorder'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/checkorder') as number],
        }),
        path: '/sell/yourphone/checkorder/:orderNo'
      },
      {
        // @ts-ignore
        component: Loadable({
          loader: () => import('../containers/aboutphone/page/shipment'),
          loading: () => null,
          modules: ['../containers/aboutphone/page/shipment'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/page/shipment') as number],
        }),
        path: '/sell/yourphone/shipment'
      },
      {
        component: redirectComponent('/notfound'),
        path: '/sell/:any',
      }
    ]
  }]