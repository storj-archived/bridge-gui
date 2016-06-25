#!/usr/bin/env node
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
  return require('../webpack/webpack-dev-server');
}

var webpack = require('webpack');
var webpackConfig = require('../webpack/prod.config');

var compiler = webpack(webpackConfig);

compiler.run(function (err, stats) {
  if (err) return console.error(err);

  var parseAssets = require('./parseAssets');
  var assets = parseAssets(stats, compiler.options);

  global.assets = assets.main;

  require('../src/server');
});

