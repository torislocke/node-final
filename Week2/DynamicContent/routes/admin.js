const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router(); 

const products = [] // create an empty products array

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        formsCSS: true, // only for handlebars engine
        productCSS: true, // only for handlebars engine
        activeAddProduct: true}); // only for handlebars engine

});
// app.post only triggers on post requests vs. app.get triggers on get requests
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title, price: req.body.price, description: req.body.description});
    res.redirect('/'); // redirect the url to /
})

exports.routes = router;
exports.products = products;