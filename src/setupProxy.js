const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware("/api/user/login",{
      target:"nerd-songwriter-api.fly.dev",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/api/user/signup",{
      target:"nerd-songwriter-api.fly.dev",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/api/songs",{
      target:"nerd-songwriter-api.fly.dev",
      changeOrigin: true
    })
  );
};