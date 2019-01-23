const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const cdn = {
  css: [
    'https://unpkg.com/ant-design-vue@1.3.2/dist/antd.min.css',
    'https://cdn.bootcss.com/highlight.js/9.13.1/languages/css.min.js',
    '//at.alicdn.com/t/font_818526_kp4owxkyqvn.css'
  ],
  js: [
    '//at.alicdn.com/t/font_818526_b07rnmer7ie.js',
    'https://cdn.bootcss.com/vue/2.5.22/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    'https://cdn.bootcss.com/moment.js/2.20.1/moment.min.js',
    'https://cdn.bootcss.com/moment.js/2.20.1/locale/zh-cn.js',
    'https://unpkg.com/ant-design-vue@1.3.2/dist/antd.min.js',
    'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
    'https://cdn.bootcss.com/highlight.js/9.13.1/highlight.min.js',
    'https://unpkg.com/@antv/g2@3.4.10/build/g2.js',
    'https://unpkg.com/apexcharts@3.1.0/dist/apexcharts.js',
    'https://unpkg.com/mavon-editor@2.6.17/dist/mavon-editor.js',
    'https://unpkg.com/lodash@4.17.11/lodash.js',
    'https://unpkg.com/ckeditor@4.11.2/ckeditor.js'
  ],
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
    if (isProduction) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  // FIXME: 压缩的似乎无效
  configureWebpack: config => {
    if (isProduction) {
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        moment: 'moment',
        'ant-design-vue': 'antd',
        jquery: '$',
        axios: 'axios',
        '@antv/g2': 'G2',
        'apexcharts': 'ApexCharts',
        'lodash': '_',
        // 'mavon-editor': 'mavon-editor',
        // 'wangEditor': 'E',
        'highlight.js': 'hljs',
      }
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
      })
    )
    config.plugins.push(
      /* 精简moment打包体积 */
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
