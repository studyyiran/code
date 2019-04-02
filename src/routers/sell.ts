import Loadable from 'react-loadable';
import redirectComponent from '@/components/redirectComponent';

export default [
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
        component: Loadable({
          loader: () => import('../containers/aboutyou'),
          loading: () => null,
          modules: ['../containers/aboutyou'],
          webpack: () => [require.resolveWeak('../containers/aboutyou') as number],
        }),
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
        component: Loadable({
          loader: () => import('../containers/aboutphone/conditions'),
          loading: () => null,
          modules: ['../containers/aboutphone/conditions'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/conditions') as number],
        }),
        path: '/sell/yourphone/condition'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/shipping'),
          loading: () => null,
          modules: ['../containers/aboutphone/shipping'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/shipping') as number],
        }),
        path: '/sell/yourphone/shipping'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/payment'),
          loading: () => null,
          modules: ['../containers/aboutphone/payment'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/payment') as number],
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
        path: '/sell/yourphone/checkorder'
      },
      {
        component: redirectComponent('/notfound'),
        path: '/sell/:any',
      }
    ]
  }]