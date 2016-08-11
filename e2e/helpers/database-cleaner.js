import url from 'url';
import mongodb from 'mongodb';
import DatabaseCleaner from 'database-cleaner';

/**
 * Factory method, providing a function to clean the mongo database
 *
 * see: https://github.com/emerleite/node-database-cleaner
 *
 * @param {(String | Object)} options - an object or string. If a string,
 * it's parsed using `url.parse`; if an object can have any of the following
 * properties but *must* have `pathname`:
 *   + [`protocol`] - defaults to "mongodb"
 *   + [`hostname]` - defaults to "localhost"
 *   + [`port`] - defaults to 27017
 *   + `pathname` - aka database name
 * @return {Function} cleanMongo - function, when called will clean the databasei
 * specified by the options; receives `done` callback which it passes to
 * `DatabaseCleaner#clean`
 */
const cleanerFactory = (options) => {
  const {
    protocol = 'mongodb',
    hostname = 'localhost',
    port = 27017,
    pathname
  } = (typeof(options) === 'string') ?
    url.parse(options) : options;

  const cleanMongo = (done) => {
    const dbCleaner = new DatabaseCleaner('mongodb');
    const mongodb = require('mongodb');
    mongodb.connect(
      url.format({
        protocol,
        hostname,
        port,
        pathname
      }),
      (err, db) => {
        if (err) {
          throw new Error(err);
        } else {
          dbCleaner.clean(db, done);
        }
      }
    );
  };

  return cleanMongo;
};

export default cleanerFactory;
