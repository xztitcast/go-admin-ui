/**
 * 配置参考: https://cli.vuejs.org/zh/config/
 */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,
  configureWebpack: config => {
    config.externals = {
      mockjs: 'Mock',
      echarts: 'echarts',
      ueditor: 'UE'
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
  },
  productionSourceMap: false,
  devServer: {
    open: true,
    port: 8900,
    proxy: {
      '/sys': {
         target: 'http://localhost:8080'
      }
    },
    overlay: {
      errors: true,
      warnings: true
    }
  }
}
