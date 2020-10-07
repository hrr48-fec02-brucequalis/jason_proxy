const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();
const port = 5000;

const whitelist = [
  'http://localhost:5000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004'
];
const corsOptions = {
  origin: (origin, cb) => {
    let originCheck = whitelist.indexOf(origin) !== -1;
    cb(null, originCheck);
  },
  credentials: true
}



app.use(express.json());
app.use(express.static(__dirname + '/../Public'));

app.use(cors(corsOptions));

app.use('/proxy', proxy({ target: `http://localhost:${port}`, changeorigin: true}));


app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});