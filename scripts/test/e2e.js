import colors from 'colors';
import path from 'path';
import {spawn} from 'child_process';
import {sync as glob} from 'glob';
import {nextOnExit, killOnExit, nullProcess} from '../helpers/processes';
import {seleniumLogger} from '../helpers/logger';
// import webpack from 'webpack';
// import webpackConfig from './webpack/e2e.config';

// webpack(webpackConfig, (err, stats) => {
//   const assets = stats.toJson().assetsByChunkName;
//   const testFiles = Object.keys(assets).map((chunk) => {
//     // TODO: get path prefix from factored out config from e2e.config.js
//     return path.resolve(__dirname, 'build', assets[chunk]);
//   });

const typeName = path.basename(__filename, '.js');

const run = (next, suiteOptions) => {
  const {
    noMockBackend
  } = suiteOptions;

  /*
   * Set environment variables used by webpack dev server
   * see <project root>/src/config.js
   */
  if (!!noMockBackend) {
    const {
      hostname,
      port
    } = noMockBackend;
    process.env.APIHOST = process.env.APIHOST || hostname;
    process.env.APIPORT = process.env.APIPORT || port;
  } else {
    process.env.APIHOST = 'localhost';
    process.env.APIPORT = Number(process.env.PORT) + 2 || 4002;
  }

  const defaultSpawnOptions = {
    cwd: path.resolve(__dirname, '..', '..'),
    stdio: ['ignore', process.stdout, process.stderr]
  };

  const e2eTestRoot = path.resolve(__dirname, '../../e2e');
  const testFiles = glob(e2eTestRoot + '/*{,*/*}-e2e.js');

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
    path.resolve(__dirname, '../../bin/server.js')
  ], {defaultSpawnOptions});

  let mockBackend;
  if (!!noMockBackend) {
    console.info(`*not* starting mock-backend server - using ${noMockBackend}...`.magenta);
    mockBackend = nullProcess;
  } else {
    console.info('starting mock-backend server...'.magenta);
    mockBackend = spawn('node', [
      path.resolve(__dirname, './mock-backend/index.js')
    ], {defaultSpawnOptions});
  }

  console.info('starting mocha...'.magenta);
  const mocha = spawn(path.resolve(__dirname, '../../node_modules/mocha/bin/_mocha'), [
    '--compilers', `js:${path.resolve(__dirname, '../../server.babel.js')}`,
    ...testFiles
  ], {...defaultSpawnOptions, stdio: 'inherit'});

  nextOnExit(mocha, next);

  killOnExit(selenium, mocha);
  killOnExit(mocha, [devServer, mockBackend]);
  killOnExit(process, [selenium, mocha, devServer, mockBackend]);
};

// });

run.typeName = typeName;
export default run;
