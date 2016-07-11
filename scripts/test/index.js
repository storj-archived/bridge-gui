import fs from 'fs';
import path from 'path';
import program from 'commander';
import {eachSeries} from 'async';
import 'colors';

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json')));
const version = pkg.version;

program
  .version(version)
  .option('-a, --all', 'Run all tests')
  .option('-u, --unit', 'Run unit tests')
  .option('-e, --e2e', 'Run end-to-end tests')
  .option('-v, --visual', 'Run visual regression tests')
  .parse(process.argv)
;

/*
 * Test entry points are expected to be in a file with the same name as the
 * corresponding `type` option, and located in the `scripts/test` directory.
 */

const types = [
  'unit',
  'e2e',
  'visual'
];

// no types specified, run all
const noTypes = !(types.some(type => !!program[type]));

eachSeries(types,
  (type, next) => {
    // checking for `-a || --all`, specific type option, or no type options
    if (program.all || program[type] || noTypes) {
      console.info(`BEGINNING tests for type ${type}:`);
      const typePath = path.resolve(__dirname, type);

      fs.stat(typePath, (err) => {
        if (err) {
          /*
           * report errors via `console.error`; async exits loop
           * if `next` is called with an error
           */
          console.error(`${err} - CONTINUING...`.red);
          next(null);
        } else {
          // run tests
          require(typePath);
          next(null);
        }
      });
    } else {
      next(null);
    }
  }, () => {
    console.info('DONE');
  }
);

