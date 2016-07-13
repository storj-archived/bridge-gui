import 'colors';
import path from 'path';
import {spawn} from 'child_process';
import {sync as glob} from 'glob';
import {killOnExit} from '../helpers/processes';
import {seleniumLogger} from '../helpers/logger';
// import webpack from 'webpack';
// import webpackConfig from './webpack/e2e.config';

const defaultSpawnOptions = {
  cwd: path.resolve(__dirname, '..', '..'),
  stdio: 'inherit'
};

const e2eTestRoot = path.resolve(__dirname, '../../e2e');
const testFiles = glob(e2eTestRoot + '/*{,*/*}-e2e.js');

// webpack(webpackConfig, (err, stats) => {
//   const assets = stats.toJson().assetsByChunkName;
//   const testFiles = Object.keys(assets).map((chunk) => {
//     // TODO: get path prefix from factored out config from e2e.config.js
//     return path.resolve(__dirname, 'build', assets[chunk]);
//   });

console.info('starting selenium...'.magenta);
const selenium = spawn('java', [
  '-jar', path.resolve(__dirname, '../../bin/selenium-server-standalone-2.53.1.jar')
], {
  ...defaultSpawnOptions,
  stdio: ['ignore', seleniumLogger.fd, seleniumLogger.fd],
  detached: true
});

console.info('starting dev server...'.magenta);
const devServer = spawn('node', [
  path.resolve(__dirname, '../../bin/server.js'), 'start-dev'
], {
  ...defaultSpawnOptions,
  stdio: ['ignore', process.stdout, process.stderr]
});

console.info('starting mocha...'.magenta);
const mocha = spawn(path.resolve(__dirname, '../../node_modules/mocha/bin/mocha'), [
  '--compilers', `js:${path.resolve(__dirname, '../../server.babel.js')}`,
  ...testFiles
], defaultSpawnOptions);

killOnExit(selenium, mocha);
killOnExit(mocha, devServer);
killOnExit(process, [selenium, mocha, devServer]);

// });
