const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js', // 入口文件
    output: {
        // filename: 'bundle.js', // 输出文件名
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'), // 输出路径
        clean: true, // 每次构建前清理输出目录
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/, // 匹配 CSS 文件
                use: ['style-loader', 'css-loader'], // 使用的 loader
            },
        ],
    },
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        static: {
            directory: path.join(__dirname, 'dist'), // 指定静态文件目录
        },
        compress: true,
        port: 9000,
        hot: true
    },
    optimization: {
        splitChunks: {
          chunks: 'all', // 所有模块都进行代码分割
          minSize: 20000, // 最小模块大小
          minRemainingSize: 0, // 最小剩余大小
          minChunks: 1, // 最小模块数量
          maxAsyncRequests: 30, // 最大异步请求数量
          maxInitialRequests: 30, // 最大初始请求数量
          enforceSizeThreshold: 50000, // 强制执行大小阈值
          cacheGroups: { // 缓存组
            defaultVendors: { // 默认供应商缓存组
              test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 目录
              priority: -10, // 优先级
              reuseExistingChunk: true, // 重用已有的 chunk
            },
            default: { // 默认缓存组
              minChunks: 2, // 最小模块数量
              priority: -20, // 优先级
              reuseExistingChunk: true, // 重用已有的 chunk
            },
          },
        },
      },
    plugins: [
        new HtmlWebpackPlugin({ // 生成 HTML 文件
            template: './index.html', // 模板文件
            filename: 'index.html', // 输出文件名
            scriptLoading: 'defer' // 延迟加载脚本
        })
    ],
    mode: 'development', // 开发模式
};