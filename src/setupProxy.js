const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware("/api/user",{
      target:"https://nerd-songwriter-backend.vercel.app/",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/api/songs",{
      target:"https://nerd-songwriter-backend.vercel.app/",
      changeOrigin: true
    })
  );
};