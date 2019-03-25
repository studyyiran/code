module.exports = {
  apps: [{
    name: 'uptradeit',
    script: './build/compiled.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      REACT_APP_SERVER_ENV: 'UAT'
    },
    env_staging: {
      NODE_ENV: 'production',
      REACT_APP_SERVER_ENV: 'UAT'
    },
    env_production: {
      NODE_ENV: 'production',
      REACT_APP_SERVER_ENV: 'PUB'
    }
  }],

  // deploy: {
  //   production: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/production',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
