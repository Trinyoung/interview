const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel 预设
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // 指定静态文件目录
    },
    compress: true,
    port: 3001,
    historyApiFallback: true,
  },
  externals: {
    // 将 React 和 ReactDOM 作为外部依赖，避免重复加载
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};