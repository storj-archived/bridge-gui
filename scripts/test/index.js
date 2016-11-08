import fs from 'fs';
import path from 'path';
import program from 'commander';
import {eachSeries} from 'async';
import colors from 'colors';

import unitSuite from './unit';
import e2eSuite from './e2e';
import visualSuite from './visual';

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json')));
const version = pkg.version;

program
  .version(version)
  .option('-a, --all', 'Run all tests')
  .option('-u, --unit', 'Run unit tests')
  .option('-e, --e2e', 'Run end-to-end tests')
  .option('-v, --visual', 'Run visual regression tests')
  .option('-M, --no-mock-backend [url]',
    'Use bridge backend at `url` instead of the mock backend; ' +
    'defaults to http://localhost:6382; ' +
    'requires running bridge server (only applicable for --e2e and --visual; ' +
    'overriden by APIHOST and APIPORT env vars)')
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ npm test -- --unit');
    console.log('    $ npm test -- -u');
    console.log('    $ npm test -- --e2e --unit');
    console.log('    $ npm test -- -e -u');
    console.log('    $ npm test -- -eu');
    console.log('');
  })
  .parse(process.argv)
;

const {
  noMockBackend
} = program;

const suiteOptions = {
  noMockBackend
};

/*
 * Test entry points are expected to be in a file with the same name as the
 * corresponding commander `type` cli option (e.g.: `--e2e` = e2e.js), and
 * located in the `scripts/test` directory.
 */
const typeSuites = [
  unitSuite,
  e2eSuite,
  visualSuite
];

// no types specified, run all
const noTypes = !(typeSuites.some(suite => !!program[suite.typeName]));

eachSeries(typeSuites,
  (suite, next) => {
    const typeName = suite.typeName;

    // checking for `-a || --all`, specific type option, or no type options
    if (program.all || program[typeName] || noTypes) {
      console.info(`BEGINNING tests for type ${typeName}:`.cyan);
      const typePath = path.resolve(__dirname, `${typeName}.js`);

      fs.stat(typePath, (err) => {
        if (err) {
          /*
           * report errors via `console.error`; async exits loop
           * if `next` is called with an error
           */
          console.error(`${err} - CONTINUING TO NEXT SUITE...`.cyan);
          next(null);
        } else {
          /*
           * Run tests - hand next off to each test so that test-type suites run serially.
           */
          suite(next, suiteOptions);
        }
      });
    } else {
      next(null);
    }
  }, () => {
    console.info('ALL SUITES FINISHED'.cyan);
  }
);
