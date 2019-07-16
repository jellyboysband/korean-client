const path = require('path');
const configureWebpack = require('./webpack.config.js');

module.exports = {
  chainWebpack (config) {
    // Only convert .svg files that are imported by these files as Vue component
    const FILE_RE = /\.(vue|js|ts|svg)$/;

    // Use vue-cli's default rule for svg in non .vue .js .ts files
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, 'src/assets/icons'))
      .end();

    // Use our loader to handle svg imported by other files
    config.module
      .rule('svg-component')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
      .use('vue')
      .loader('vue-loader')
      .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader');
  },

  configureWebpack,

  css: {
    loaderOptions: {
      css: {
        localIdentName: '[name]-[hash]',
      },
      stylus: {
        import: [
          path.resolve(__dirname, 'src/assets/styles/constants.styl'),
        ],
      },
    },
  },

  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
      },
      '^/upload': {
        target: process.env.VUE_APP_UPLOAD_URL,
        changeOrigin: true,
      },
    }
  },

  lintOnSave: false,

  pwa: {
    themeColor: '#f6cd07',
    msTileColor: '#bf9d00',
  },
};
