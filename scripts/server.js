const chalk = require('chalk');
const webpack = require('webpack');
const fs = require('fs-extra');


const webpackConfig = require('../config/webpack.config.server');


webpack(webpackConfig, function (err, stats) {

  if (err) {
    throw err;
  }


  console.log(chalk.cyan('  Build complete.\n'));

  fs.copySync(__dirname + '/../build/static', __dirname + '/../build_server/static', {
    dereference: true,
  });
});