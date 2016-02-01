require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'MetaDisk',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'React Redux Example: %s',
      meta: [
        {name: 'description', content: 'MetaDisk provides developers and IT teams with high performance, durable object storage.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'MetaDisk - The Most Secure Cloud Storage'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'MetaDisk - The Most Secure Cloud Storage'},
        {property: 'og:description', content: 'MetaDisk provides developers and IT teams with high performance, durable object storage.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@rforan'},
        {property: 'og:creator', content: '@rforan'},
        {property: 'og:image', content: (process.env.HOST || 'localhost') + '/img/logo-white.svg'},
        {property: 'og:image:width', content: '150'},
        {property: 'og:image:height', content: '25'}
      ]
    }
  },

}, environment);
