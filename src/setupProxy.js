const proxy = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    proxy("/api",{
      target:"https://nerd-songwriter-backend.onrender.com",
      changeOrigin: true
    })
  );
};