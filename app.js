const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));//For logging requests on the console

app.use(bodyParser.urlencoded({extended: false})); //For accessing the url content(non-alphanumeric) wrapped in client requests.
app.use(bodyParser.json()); //For accessing Json formatted data in client requests.

//To address CORS errors in the API, i.e 'error': 'No Access-Control-Allow-Origin header is present'
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); /*The asterisk(*) argument gives access to any origin. It can be replaced by:
    'http://blacknblue.inc' to restrict access to that domain only*/
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept, Authorization');/*
    For attaching all the headers that could come with the client request. Again, a simple * could do here*/
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});


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
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;