const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use("/api/user/login",
    createProxyMiddleware({
      target:"nerd-songwriter-api.fly.dev",
      changeOrigin: true
    })
  );
  app.use("/api/user/signup",
    createProxyMiddleware({
      target:"nerd-songwriter-api.fly.dev",
      changeOrigin: true
    })
  );
  app.use("/api/songs",
    createProxyMiddleware({
      target:"nerd-songwriter-api.fly.dev",
      changeOrigin: true
    })
  );
};