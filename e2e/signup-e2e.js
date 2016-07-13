import {expect} from 'chai';
import nightwatch from 'nightwatch';
import http from 'http';
import 'colors';

const port = Number(process.env.PORT) + 1 || 4001;
const baseUrl = `http://localhost:${port}/`;
const bootTimeout = 15000;
const bootIntervalTimeout = 500;
const boot = (done) => {
  /*
   * POLL UNTIL SERVER HAS STARTED
   */
  const intervalId = setInterval(() => {
    const request = http.get(baseUrl, (res) => {
      if (res.statusCode === 200) {
        clearInterval(intervalId);
        console.info('server ready!');
        done();
      } else {
        console.info('waiting for server: '.yellow + 'non-200 status...');
      }
    })
      .on('error', (err) => {
        console.info('waiting for server: '.yellow + `${err}...`);
      });

    request.setTimeout(bootIntervalTimeout, () => {
      console.info('waiting for server: '.yellow + 'timeout...');
      request.abort();
    });
  }, bootIntervalTimeout);
};

context('After server boot:', () => {
  const client = nightwatch.initClient({silent: true});
  const browser = client.api();

  /* NOTE: must use ES5 anon function syntax.
   * ES2015 transpilation breaks async detection
   * and `this.timeout` won't work
   */
  before(function(done) {
    this.timeout(bootTimeout);
    boot(done);
  });

  describe('new user signup', function() {
    this.timeout(30000);
    beforeEach(function(done) {
      client.start(done);
    });

    it('should render the signup form', (done) => {
      browser
        .url(baseUrl)
        .waitForElementVisible('body', 5000)
        .expect.element('form ').to.be.present;

      client.start(done);
    });

    after(function(done) {
      browser.end();
      client.start(done);
    });
  });
});
