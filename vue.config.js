const { defineConfig } = require('@vue/cli-service');
//打包体积分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//element-plus按需引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const resolve = function (dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true, //运行时编译，解决实例化app时的template选项问题
  pages: {
    index: {
      entry: 'src/views/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-cmmon', 'index'],
    },
    preview: {
      entry: 'src/views/preview/main.js',
      template: 'public/preview.html',
      filename: 'preview.html',
      chunks: ['chunk-vendors', 'chunk-cmmon', 'preview'],
    }
  },
  configureWebpack: config => {
    const plugins = [
      // new BundleAnalyzerPlugin(),
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
      new MonacoWebpackPlugin(),
    ]
    config.plugins.push(...plugins);
    config.externals = {
      // vue: 'Vue',
      // 'element-plus': 'ElementPlus',
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('svg');
    config.module.rule('svg-sprite-loader').test(/\.svg$/)
      .include
      .add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
})
