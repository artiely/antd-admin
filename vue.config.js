const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  // 项目部署的基本url
  baseUrl: '',
  // 打包到dist文件下
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'static',
  // chainWebpack: config => {
  //   // 移除 prefetch 插件
  //   config.plugins.delete('prefetch')
  // },
  // 关闭生产 SourceMap
  productionSourceMap: false,
  // 加入markdown解析
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('raw-loader')
  },
  // FIXME: 压缩的似乎无效
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugin: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false,
          }),
        ],
      }
    }
  },
  configureWebpack: {
    plugins: [
      /* 骨架屏配置 */
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/skeleton.js'),
          },
        },
        minimize: true,
        quiet: true,
      }),
    ],
  },
  devServer: {
    // 代理
    // proxy: {
    //   '/ns-index': {
    //     target: 'http://192.168.2.243:7070',
    //     changeOrigin: true,
    //     pathRewrite: {
    //     },
    //   },
    // },
  },
}
