const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@icons': path.resolve('./src/common/assets/icons'),
      '@images': path.resolve('./src/common/assets/images'),
      '@styles': path.resolve('./src/common/assets/styles'),
    },
  },
  // output: {
  //     filename: '[name].[hash].js',
  // },
  // optimization: {
  //     runtimeChunk: 'single',
  //     splitChunks: {
  //         chunks: 'all',
  //         maxInitialRequests: Infinity,
  //         minSize: 0,
  //         cacheGroups: {
  //             vendor: {
  //                 test: /[\\/]node_modules[\\/]/,
  //                 name(module) {
  //                     // получает имя, то есть node_modules/packageName/not/this/part.js
  //                     // или node_modules/packageName
  //                     const packageName = module.context.match(
  //                         /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
  //                     )[1]

  //                     // имена npm-пакетов можно, не опасаясь проблем, использовать
  //                     // в URL, но некоторые серверы не любят символы наподобие @
  //                     return `npm.${packageName.replace('@', '')}`
  //                 },
  //             },
  //         },
  //     },
  // },
};
