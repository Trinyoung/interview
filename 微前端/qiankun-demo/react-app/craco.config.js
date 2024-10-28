const { name } = require('./package');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.library = `${name}-[name]`;
      webpackConfig.output.libraryTarget = 'umd';
      webpackConfig.output.globalObject = 'window';
      // webpackConfig.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
      // webpackConfig.output.jsonpFunction =  `webpackJsonp_${name}`; 

      return webpackConfig;
    }
  },
  devServer: (devServerConfig) => {
    devServerConfig.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    devServerConfig.historyApiFallback = true;
    devServerConfig.hot = false;
    // devServerConfig.watchContentBase = false;
    devServerConfig.liveReload = false;
    return devServerConfig;
  }
};