const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
};

app.listen(3000, () => {
  console.log('Server is running on port 5000');
});