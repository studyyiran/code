import Loadable from 'react-loadable';
import redirectComponent from '@/components/redirectComponent';
import getSellPath from "@/utils/util";

export default [
  {
    component: Loadable({
      loader: () => import('../pages/sell'),
      loading: () => null,
      modules: ['../pages/sell'],
      webpack: () => [require.resolveWeak('../pages/sell') as number],
    }),
    path: getSellPath(),
  },
  {
    component: Loadable({
      loader: () => import('../containers/selllayout'),
      loading: () => null,
      modules: ['../containers/selllayout'],
      webpack: () => [require.resolveWeak('../containers/selllayout') as number],
    }),
    path: '/oldsell',
    children: [
      {
        component: redirectComponent('/sell/yourphone/brand'),
        path: '/oldsell/account',
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/brands'),
          loading: () => null,
          modules: ['../containers/aboutphone/brands'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/brands') as number],
        }),
        path: '/oldsell/yourphone/brand'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/carriers'),
          loading: () => null,
          modules: ['../containers/aboutphone/carriers'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/carriers') as number],
        }),
        path: '/oldsell/yourphone/carrier'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/models'),
          loading: () => null,
          modules: ['../containers/aboutphone/models'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/models') as number],
        }),
        path: '/oldsell/yourphone/model'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/other'),
          loading: () => null,
          modules: ['../containers/aboutphone/other'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/other') as number],
        }),
        path: '/oldsell/yourphone/other'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/done'),
          loading: () => null,
          modules: ['../containers/aboutphone/done'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/done') as number],
        }),
        path: '/oldsell/yourphone/done'
      },
      {
        component: Loadable({
          loader: () => import('../containers/aboutphone/checkorder'),
          loading: () => null,
          modules: ['../containers/aboutphone/checkorder'],
          webpack: () => [require.resolveWeak('../containers/aboutphone/checkorder') as number],
        }),
        path: '/oldsell/yourphone/checkorder/:orderNo'
      },
      {
        component: redirectComponent('/notfound'),
        path: '/oldsell/:any',
      }
    ]
  }]