import express from 'express';
import {
  json as jsonBodyParser,
  urlencoded as urlEncodedParser
} from 'body-parser';

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
  .use(urlEncodedParser({extended: true}))
  .post('/users', (req, res) => {
    console.log('req.body: %j', req.body);
    const emailMatches = req.body.email.match(/^\S+(?=@)/);
    const user = emailMatches && emailMatches[0];
    console.log('emailMatches: %j', emailMatches);
    console.log('user: %j', user);
    let result;

    if (!user) return res.sendStatus(400); // invalid email

    switch (user) {
      case 'existing':
        result = {error: 'Email is already registered'};
        break;
      case 'nocors':
        res.removeHeader('Accesss-Control-Allow-Origin');
        res.removeHeader('Accesss-Control-Allow-Credentials');
        res.removeHeader('Accesss-Control-Allow-Methods');
        res.removeHeader('Accesss-Control-Allow-Headers');
        break;
      default:
        result = {
          activated: false,
          created: (new Date).toJSON(),
          email: req.body.email,
          id: req.body.email
        };
    }

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
