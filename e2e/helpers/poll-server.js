import http from 'http';
import colors from 'colors';

/*
 * POLL UNTIL SERVERS HAVE STARTED
 */

const mockBackend = (mockBackendBaseUrl, bootIntervalTimeout) => {
  const mockBackendReady = (done) => {
    const mockBackendIntervalId = setInterval(() => {
      const request = http.get('http://localhost:4002/ready', (res) => {
        if (res.statusCode === 204) {
          clearInterval(mockBackendIntervalId);
          console.info('mock backend ready...'.magenta);
          done();
        } else {
          console.info('waiting for mock backend: '.yellow + 'non-204 status...');
        }
      })
        .on('error', (err) => {
          console.info('waiting for mock backend: '.yellow + `${err}...`);
        });

      request.setTimeout(bootIntervalTimeout, () => {
        console.info('waiting for mock backend: '.yellow + 'timeout...');
        request.abort();
      });
    }, bootIntervalTimeout);
  };

  return mockBackendReady;
};

const devServer = (devServerBaseUrl, bootIntervalTimeout) => {
  const devServerReady = (done) => {
    const devServerIntervalId = setInterval(() => {
      const request = http.get(devServerBaseUrl, (res) => {
        if (res.statusCode === 200) {
          clearInterval(devServerIntervalId);
          console.info('dev server ready...'.magenta);
          done();
        } else {
          console.info('waiting for dev server: '.yellow + 'non-200 status...');
        }
      })
        .on('error', (err) => {
          console.info('waiting for dev server: '.yellow + `${err}...`);
        });

      request.setTimeout(bootIntervalTimeout, () => {
        console.info('waiting for dev server: '.yellow + 'timeout...');
        request.abort();
      });
    }, bootIntervalTimeout);
  };

  return devServerReady;
};

export {
  mockBackend,
  devServer
};
