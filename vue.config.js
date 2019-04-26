const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: [
          `@import "@/assets/scss/variables.scss";`,
          `@import "@/assets/scss/mixin.scss";`
        ].join('')
      }
    }
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('mixin', resolve('src/mixin'))
      .set('img', resolve('src/assets/images'))
      .set('scss', resolve('src/assets/scss'))
      .set('store', resolve('src/store'))
      .set('util', resolve('src/utils'))
      .set('view', resolve('src/views'))
      .set('router', resolve('src/router'))
      .set('constant', resolve('src/constant'))
      .set('comp', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('filter', resolve('src/filters'))
  }
}