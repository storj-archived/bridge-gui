import path from 'path';
import colors from 'colors';

const typeName = path.basename(__filename, '.js');

const run = (next) => {
  console.info(`To add a ${typeName} test suite write some code in ${__filename}`.yellow);
  next();
};

run.typeName = typeName;
export default run;
