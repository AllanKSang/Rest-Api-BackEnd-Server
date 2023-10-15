const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//For logging requests on the console
app.use(morgan('dev'));

//Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//Error handling, 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status =404;
    next(error)
});

//Error handling for errors not accounted for by 404
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;