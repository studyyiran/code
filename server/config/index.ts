import dev from './default.config';
import prod from './prod.config';

let config = dev;
if (process.env.REACT_APP_SERVER_ENV === 'PUB') {
  config = prod;
}

export default config;