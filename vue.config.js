module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3333,
    open: true
  },
  css:{
    loaderOptions:{
      sass:{
        data:`@import "@/assets/scss/_variable.scss"`
      }
    }
  }
};
