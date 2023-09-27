const { createProxyMiddleware } = require('http-proxy-middleware');
//npm install http-proxy-middleware --save
module.exports =function(app){
  app.use(
    '/api',
    createProxyMiddleware({
      target:'http://localhost:8080',
      changeOrigin:true,
      pathRewrite:{
        "^/api":""
      }
    })
  )
}
