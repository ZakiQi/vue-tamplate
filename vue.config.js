const glob = require('glob')
const path = require('path')

const VUE_APP_ALLOW_ENTRY = process.env.VUE_APP_ALLOW_ENTRY || ''
// 多页面入口路径
const resolve = folder => path.resolve(__dirname, folder)
const PAGE_PATH = resolve('src/pages')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
// lodash按需打包插件
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

/**
 * 样式预处理器全局变量资源插件
 * @param {String} rule webpack 规则
 */
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [resolve('./src/assets/less/var.less')]
    })
}

/**
 * 获取多页面配置对象
 */
function getPagesConfig(entry) {
  const pages = {}
  // 规范中定义每个单页文件结构
  // index.html,main.js,App.vue
  glob.sync(`${PAGE_PATH}/*/main.js`).forEach(filePath => {
    const pageName = path.basename(path.dirname(filePath))
    if (entry && entry !== pageName) return
    pages[pageName] = {
      entry: filePath,
      // 除了首页，其他按第二级目录输出
      // 浏览器中直接访问/news,省去/news.html
      fileName: `${pageName === 'index' ? '' : `${pageName}/`}index.html`,
      template: `${path.dirname(filePath)}/index.html`,
      chunks: ['vue-common', 'echarts', 'vendors', 'manifest', pageName]
    }
  })
  return pages
}

const pages = getPagesConfig(VUE_APP_ALLOW_ENTRY)

module.exports = {
  // 公共路径
  publicPath: process.env.NODE_ENV === 'production' ? '/automatic/' : '/',
  // 打包路径
  outputDir: 'dist',
  // 静态资源路径
  assetsDir: 'assets',
  lintOnSave: false,
  // 多页配置
  pages: {
    ...pages
    // 手动设置单页
    // about: 'src/pages/about/main.js'
  },
  // 生产环境禁止生成SourceMap
  productionSourceMap: process.env.NODE_ENV !== 'production', // 不需要生产环境的 source map 设置false（减小dist文件大小，加速构建）

  // 自定义webpack配置
  configureWebpack: () => ({
    cache: true, // 开启 cache，加快二次构建速度
    plugins: [
      // 开启gzip压缩
      new CompressionWebpackPlugin({
        test: /\.(js|css)(\?.*)?$/i, // 需要压缩的文件正则
        threshold: 10240, // 文件大小大于这个值时启用压缩
        deleteOriginalAssets: false // 压缩后保留原文件
      }),

      // lodash按需打包
      new LodashModuleReplacementPlugin()
    ],
    optimization: {
      runtimeChunk: process.env.NODE_ENV === 'production' ? { name: 'manifest' } : false,
      splitChunks: {
        automaticNameDelimiter: '--',
        cacheGroups: {
          vendors: {
            name: 'vendors',
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            priority: 2
          },
          vue: {
            name: 'vue-common',
            test: module => /vue|axios/g.test(module.context),
            chunks: 'initial',
            priority: 10
          },
          echarts: {
            name: 'echarts',
            test: module => /echarts/g.test(module.context),
            chunks: 'initial',
            priority: 10
          }
          // ,
          // antd: {
          //   name: 'antd',
          //   test: module => /antd/g.test(module.context),
          //   chunks: 'initial',
          //   priority: 10
          // }
        }
      }
    }
  }),

  // 扩展webpack配置
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('vue$', resolve('./node_modules/vue/dist/vue.common.js'))
      .set('assets', resolve('@/assets'))
      .set('components', resolve('@/components'))
      .set('Lib', resolve('src/lib'))
      .set('API', resolve('Lib/services'))
      .set('@preview', resolve('@/pages/preview'))
      .set('@Ind', resolve('src/pages/index'))

    // 添加 css 全局变量资源插件
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },

  // 开发服务器配置
  devServer: {
    port: '8998',
    proxy: {
      // '/mock': {
      //   target: 'https://easy-mock.com/mock/5ba83adde786c911a33a5090',
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     '/mock': '',
      //   }
      // },
      '/ecpp': {
        // target: 'http://192.168.30.179:8998/',
        target: 'http://192.168.15.119:8080/',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
