const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
const port = 3001;
//import servers
const {
  API_SIMPLE_URL,
  API_REST_URL,
} = require('./URLs');

const userServiceProxy = httpProxy(API_SIMPLE_URL);
const productsServiceProxy = httpProxy(API_REST_URL);

app.get('/', (req, res) => res.send('Hello Gateway API'));

app.get('/users', (req, res, next) => userServiceProxy(req, res, next));
app.get('/products', (req, res, next) => productsServiceProxy(req, res, next));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));