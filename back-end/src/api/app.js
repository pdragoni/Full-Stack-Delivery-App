const express = require('express');
const Route = require('./routes');

const app = express();

app.use(express.json());

app.use('/users', Route.Users);

// app.use('/products', Route.Products);

// app.use('/sales', Route.Sales);

// app.use('/admin', Route.Admin);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
