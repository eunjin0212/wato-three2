const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://49.247.156.91:8080",
      changeOrigin: true,
    })
  );
};
