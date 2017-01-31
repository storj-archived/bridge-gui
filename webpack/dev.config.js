// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');
var Dotenv = require('dotenv-webpack');

var relativeAssetsPath = '../static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

var config = require('../src/config');
var port = (config.port + 1) || 3001;

var excludeRegex = /(?:^\/home\/vagrant\/(?!bridge-gui))|(?:node_modules)/;

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
    './src/client.js',
    './src/theme/shame.scss'
  ],
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    noParse: [
      /node_modules\/json-schema\/lib\/validate\.js/
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: excludeRegex, loaders: ['react-hot', 'babel']},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.(jpeg|jpg|png|gif)$/, loader: 'url-loader?limit=10240' },
      { test: /kad-localstorage/, loader: "shebang" }
    ]
  },
  progress: true,
  resolve: {
    // root: path.resolve(__dirname, '..'),
    alias: {
      dgram: `${__dirname}/stubs/dgram`,
      bufferutil: `${__dirname}/stubs/blank`,
      'utf-8-validate': `${__dirname}/stubs/blank`,
      'graceful-fs': `${__dirname}/stubs/blank`
    },
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    //set environment variables with dotenv
    new Dotenv({
      path: './.env',
      safe: false
    }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name].css', {allChunks: true}),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('development'),
        APIHOST: JSON.stringify(process.env.APIHOST),
        APIPORT: JSON.stringify(process.env.APIPORT),
        APIPROTOCOL: JSON.stringify(process.env.APIPROTOCOL),
        APOLLO_CLIENT_URL: JSON.stringify(process.env.APOLLO_CLIENT_URL),
        STRIPE_PUBLISHABLE_KEY: JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY)
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
/*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
*/
  ]
};
