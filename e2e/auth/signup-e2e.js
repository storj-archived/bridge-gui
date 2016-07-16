import {expect} from 'chai';
import nightwatch from 'nightwatch';
import 'colors';
import {parallel, series} from 'async';
import cleanerFactory from '../helpers/databaseCleaner';
import {mockBackend, devServer} from '../helpers/pollServer';

const devServerPort = Number(process.env.PORT) + 1 || 4001;
const devServerBaseUrl = `http://localhost:${devServerPort}/`;
const mockBackendPort = Number(process.env.APIPORT) ||
  Number(process.env.PORT) + 2 || 4002;
/*
  * TODO: remove `/ready` path and find a better way that works with
  * --no-mock-backend
  */
const mockBackendBaseUrl = `http://localhost:${mockBackendPort}/ready`;
const bootTimeout = 15000;
const bootIntervalTimeout = 500;

// TODO: use process.env.DATABASE_URL
const cleanMongo = cleanerFactory({
  pathname: '__storj-bridge-test'
});

const mockBackendReady = mockBackend(mockBackendBaseUrl, bootIntervalTimeout);
const devServerReady = devServer(devServerBaseUrl, bootIntervalTimeout);

context('After server boot:', () => {
  const client = nightwatch.initClient({silent: true});
  const browser = client.api();

  /* NOTE: must use ES5 anon function syntax.
   * ES2015 transpilation breaks async detection
   * and `this.timeout` won't work
   */
  before(function(done) {
    this.timeout(bootTimeout);
    parallel([
      devServerReady,
      mockBackendReady,
      cleanMongo
    ], done);
  });

  describe('Signup page', function() {
    this.timeout(30000);

    const emailSelector = 'form input[name="email"]';
    const passwordSelector = 'form input[name="password"]';
    const submitSelector = 'form [type="submit"]';
    const eulaSelector = 'form [type="checkbox"]';

    beforeEach(function(done) {
      parallel([
        (next) => {
          browser
            .url(`${devServerBaseUrl}#/signup`)
            .waitForElementVisible('body', 5000);
          client.start(() => next(null));
        },
        cleanMongo
      ], done);
    });

    it('should render the signup form', () => {
      /*
       * Expect form and form inputs with name attributes.
       * These name attributes are required for autofill
       */
      browser.expect.element(emailSelector).to.be.present;
      browser.expect.element(passwordSelector).to.be.present;
      browser.expect.element(eulaSelector).to.be.present;

      /*
       * Expect unspecified tag with type attribute equal to "submit".
       * This type is required so that the enter key submits the form.
       */
      browser.expect.element(submitSelector).to.be.present;
    });

    describe('Register a new user', function(done) {
      const email = 'testy@example.com';
      const password = 'badpassword';

      context('successful registration', function() {
        before(function(done) {
          /*
           * Fill in email and password, and press the "enter" key.
           */
          browser
            .setValue(emailSelector, email)
            .click(eulaSelector)
            .setValue(passwordSelector, [password, browser.Keys.ENTER])
          ;

          client.start(done);
        });

        it('should render the "success" page', function() {
          // pending
        });
      });

      context('account for given email already exists', function() {
        // pending
      });

      context('CORS misconfiguration', function(){
        // send `noCORS` param
        // pending
      });
    });

    describe('Form validation', function() {
      // pending
    });

    afterEach(function(done) {
      client.start(done);
    });

    after(function(done) {
      browser.end();
      client.start(done);
    });
  });
});
