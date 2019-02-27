import TITLE_CONFIG from './title.config';
import { EOrderStatus } from './order.status.config';
import NAVIGATOR from './navigator.config';
import DEFAULT from './defalut.config';
import devConfig from './dev.config';
import prodConfig from './prod.config';
import FOOTERLINKS from './footerLinks.config';

let ENVCONFIG = devConfig;

if (process.env.REACT_APP_SERVER_ENV === 'PUB') {
  ENVCONFIG = prodConfig;
}

export {
  TITLE_CONFIG,
  EOrderStatus,
  NAVIGATOR,
  DEFAULT,
  ENVCONFIG,
  FOOTERLINKS
}