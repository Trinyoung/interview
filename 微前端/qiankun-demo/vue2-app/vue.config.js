const { name } = require('./package.json')
module.exports = {
    devServer: {
        port: 81,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    configureWebpack: {
        output: {
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`,
            globalObject: 'window'
        }
    }
}