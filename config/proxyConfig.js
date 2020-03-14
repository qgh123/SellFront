module.exports = {
  proxy: {
    '/sell':{
      target:'http://localhost:8082',
      //target: 'http://47.98.198.11:8888',
      changeOrigin:true,
    }
  }
}
