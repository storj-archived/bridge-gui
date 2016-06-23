/* 
 * modified from `assets-webpack-plugin` source
 * see https://github.com/kossnocorp/assets-webpack-plugin
 * 
 */

var camelcase = require('camelcase');
var getFileExtension = require('./getFileExtension');

module.exports = function getAssetKind(options, asset) {
  var ext = getFileExtension(asset);
  return camelcase(ext);
};
