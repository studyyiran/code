import store from '../src/store';
import NotFound from '../src/containers/notfound';
import Home from '../src/containers/home';
import Faq from '../src/containers/single/faq'
import Contact from '../src/containers/contact'
import Why from '../src/containers/single/why'
import Broken from '../src/containers/single/broken'
import Howmuch from '../src/containers/single/howmuch'
import Android from '../src/containers/single/android'
import Iphone from '../src/containers/single/iphone'
import Privacypolicy from '../src/containers/single/privacypolicy'
import Terms from '../src/containers/single/terms'
import Howitworks from '../src/containers/single/howitworks'
import AboutUs from '../src/containers/single/aboutUs'
import Reviews from '../src/containers/home/reviews'

export default [
  {
    // faq
    component: Faq,
    exact: true,
    path: '/faq',
  },
  {
    component: Contact,
    exact: true,
    path: '/contact',
  },
  {
    component: Why,
    exact: true,
    path: '/why-uptrade',
  },
  {
    component: Broken,
    path: '/sell-broken-iphone',
  },
  {
    component: Howmuch,
    path: '/how-much-is-my-phone-worth',
  },
  {
    component: Android,
    path: '/how-to-factory-reset-android-phone',
  },
  {
    component: Iphone,
    path: '/how-to-factory-reset-iphone',
  },
  {
    component: Privacypolicy,
    path: '/privacy-policy',
  },
  {
    component: Terms,
    path: '/terms',
  },
  {
    component: Howitworks,
    path: '/sell-my-phone',
  },
  {
    component: AboutUs,
    path: '/who-we-are',
  },
  {
    component: Reviews,
    exact: true,
    path: '/reviews',
    actions: [
      () => store['common'].getReviews({
        page: 0,
        pageSize: 100,
        order: 'desc'
      }),
    ],
    // templateValue:{
    //   title:'测试title',
    //   keywords:'测试keywords',
    //   description:'测试description'
    // }
  },
  {
    // 404
    component: NotFound,
    exact: true,
    path: '/:any',
  },
  {
    // 首页
    component: Home,
    exact: true,
    path: '/',
    actions: [
      () => store['common'].getReviews({
        page: 0,
        pageSize: 3,
        order: 'desc'
      }),
      store['common'].getModuleOn
    ]
  },
];