#!/usr/bin/env node

/*
 * CHECK NODE VERSION!
 */
var fs = require('fs');
var path = require('path');
var currentNodeVersion = process.versions.node;
var wantedNodeVersion = fs.readFileSync(path.resolve(__dirname, '../.nvmrc')).toString();
var wantedRegex = (new RegExp('^' + wantedNodeVersion.match(/^(\d+)\./)[1]));

var webpackConfig = require('../webpack/prod.config');
var assets = require(webpackConfig.output.assetsJsonPath);

if (!wantedRegex.test(currentNodeVersion)) {
  console.error('Your current node version is %s. Please use a version that is semver compatible with ^%s', currentNodeVersion, wantedNodeVersion)
} else {
  require('../server.babel'); // babel registration (runtime transpilation for node)
  /**
   * Define isomorphic constants.
   */
  global.__CLIENT__ = false;
  global.__SERVER__ = true;
  global.__DISABLE_SSR__ = true;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
  global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

  if (__DEVELOPMENT__) {
    console.log('RUNNING IN DEVELOPMENT');
    require('../webpack/webpack-dev-server');
  } else {
    global.assets = assets.main;

    require('../src/server');
  }
}

