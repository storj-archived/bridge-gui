/* 
 * modified from `assets-webpack-plugin` source
 * see https://github.com/kossnocorp/assets-webpack-plugin
 * 
 */

var pathTemplate = require('./pathTemplate');

module.exports = function isSourceMap (options, asset) {
  var sourceMapFilename = options.output.sourceMapFilename;
  var sourcemapTemplate = pathTemplate(sourceMapFilename);
  return sourcemapTemplate.matches(asset)
};
