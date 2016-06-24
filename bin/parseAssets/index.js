/* 
 * modified from `assets-webpack-plugin` source
 * see https://github.com/kossnocorp/assets-webpack-plugin
 * 
 */

var isSourceMap = require('./isSourceMap');
var getAssetKind = require('./getAssetKind');

module.exports = function (stats, options) {
  var assetsByChunkName = stats.toJson().assetsByChunkName;
  var assetPath = options.output.publicPath;

  return Object.keys(assetsByChunkName).reduce(function (chunkMap, chunkName) {
    var assets = assetsByChunkName[chunkName];
    if (!Array.isArray(assets)) {
      assets = [assets];
    }
    chunkMap[chunkName] = assets.reduce(function (typeMap, asset) {
      if (isSourceMap(options, asset)) {
        return typeMap;
      }

      var typeName = getAssetKind(options, asset);
      typeMap[typeName] = assetPath + asset;

      return typeMap;
    }, {});

    return chunkMap;
  }, {});
};
