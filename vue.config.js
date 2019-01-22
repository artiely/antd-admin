const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production'
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 项目部署的基本url
  baseUrl: '',
  // 打包到dist文件下
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'static',
  // 关闭生产 SourceMap
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true, // 开启 CSS source maps?
    sourceMap: false, // css预设器配置项
    loaderOptions: {}, // 启用 CSS modules for all css / pre-processor files.
    modules: false,
  },
  // 加入markdown解析
  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('raw-loader')
  },
  // FIXME: 压缩的似乎无效
  configureWebpack: config =>{
    if (isProduction) {
      // config.externals = {
      //   vue: 'Vue',
      //   'vue-router': 'VueRouter',
      //   moment: 'moment',
      //   // 'ant-design-vue': 'Antd',
      //   jquery: '$',
      //   axios: 'axios',
      //   // '@antv/g2': 'G2',
      //   'apexcharts': 'ApexCharts',
      //   'lodash': '_',
      //   // 'mavon-editor': 'mavonEditor',
      //   // 'wangEditor': 'E',
      //   'highlight.js': 'hljs',
      // }
      // 打包生产.gz包
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        })
      )
      // 添加自定义代码压缩配置
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    }
    config.plugins.push(
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
    )
  },
  devServer: {
    // 代理
    proxy: {
      '/ucar': {
        target: 'http://120.78.174.212:8001',
        changeOrigin: true,
        pathRewrite: {
          // '/api': '',
        },
      },
    },
  },
}
