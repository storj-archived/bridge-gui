var glob = require('glob').sync;
var path = require('path');
// var webpack = require('webpack');

var e2eTestRoot = path.resolve(__dirname, '../../../e2e');
var outputPath = path.resolve(__dirname, '../build');
var testFiles = glob(e2eTestRoot + '/*{,*/*}-e2e.js');
var entries = testFiles.reduce(function(fileMap, nextPath) {
  var filename = path.basename(nextPath);
  var basename = filename.substr(0, filename.lastIndexOf('.'));
  var _relativeDirname = path.relative(e2eTestRoot, path.dirname(nextPath));
  var relativeDirname = './' + (_relativeDirname ? _relativeDirname + '/' : '');
  var relativePath = relativeDirname + filename;
  fileMap[basename] = relativePath;
  return fileMap;
}, {});

module.exports = {
  cache: true,
  // devtool: 'source-map',
  context: e2eTestRoot,
  entry: entries,
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  module: {
    noParse: [],
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.json$/, loader: 'json'}
    ]
  },
  progress: false,
  // resolve: {
  //   alias: {},
  //   modulesDirectories: [
  //     'src',
  //     'node_modules'
  //   ],
  //   extensions: ['', '.json', '.js', '.jsx']
  // },
  target: 'node',
  // node: {
  //   console: true,
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // },
  // plugins: [
  //   optimizations
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.OccurenceOrderPlugin(),
  // ]
};
