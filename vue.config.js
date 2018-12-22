const path = require('path');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  // runtimeCompiler: true,
  // chainWebpack: config => {
  //   // 移除 prefetch 插件
  //   config.plugins.delete('prefetch')
  // },
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugin: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false
        })]
      }
    }
  },
  configureWebpack: {
    plugins: [
      new SkeletonWebpackPlugin({ /* 骨架屏配置 */
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/skeleton.js'),
          },
        },
        minimize: true,
        quiet: true,
      })
    ]
  },

  devServer: { // 代理
    proxy: {
      '/ns-index': {
        target: 'http://192.168.2.243:7070', //本地测试
        // target: 'http://192.168.2.121:7070', //本地测试
        // target: 'http://192.168.2.118:8089', //本地测试
        changeOrigin: true,
        pathRewrite: {
          // '^/ns-index': ''
        }
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
};
