const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = require('express-http-proxy');

const app = express();
const port = 5000;





app.use(express.json());
app.use(express.static(__dirname + '/../Public'));



app.use('/proxy', proxy({ target: `http://localhost:${port}`, changeorigin: true}));


app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});