import {methods} from 'http';
import express from 'express';
import {json as jsonBodyParser} from 'body-parser';
import 'colors';

console.log('HELLO FROM MOCK BACKEND');

const mockApp = express();
const mockAppPort = Number(process.env.BACKEND_PORT) ||
  Number(process.env.PORT) + 2 || 4002;

mockApp
// CORS middleware
  .use((req, res, next) => {
    if (req.param.noCORS === true) {
      return next();
    }

    res.set('Access-Control-Allow-Origin', req.get('origin'));
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods',
      req.get('Access-Control-Request-Method'));
    res.set('Access-Control-Allow-Headers',
      req.get('Access-Control-Request-Headers'));

    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  })
  .use(jsonBodyParser())
  .post('/users', (req, res) => {
    console.log('hello from POST /users');
    const result = {
      activated: false,
      created: (new Date).toJSON(),
      email: req.body.email,
      id: req.body.email
    };

    res.json(result);
  })
  .get('/ready', (req, res) => {
    res.sendStatus(204);
  })
  .all('*', (req, res) => {
    res.sendStatus(404);
  })
;

console.log(`==> 🚧  Mock backend server listening on port ${mockAppPort}`.magenta);
mockApp.listen(mockAppPort);
