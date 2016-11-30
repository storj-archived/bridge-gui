// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var relativeAssetsPath = '../static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

var config = require('../src/config');
var port = (config.port + 1) || 3001;

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
    './src/client.js',
    './src/theme/shame.sc'
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
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']},
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
        APIPORT: JSON.stringify(process.env.APIPORT)
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
