const chalk = require('chalk');
const webpack = require('webpack');
const fs = require('fs-extra');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.REACT_APP_NODE_BUILD = 'NODE';

process.env.GENERATE_SOURCEMAP = 'false';

const webpackConfig = require('../config/webpack.config.server');


webpack(webpackConfig, function (err, stats) {

  if (err) {
    throw err;
  }


  console.log(chalk.cyan('  Build complete.\n'));

  // fs.copySync(__dirname + '/../build/static', __dirname + '/../build_server/static', {
  //   dereference: true,
  // });
});


