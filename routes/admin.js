const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router(); 

const products = [] // create an empty products array

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  });
// app.post only triggers on post requests vs. app.get triggers on get requests
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
  });
  
  exports.routes = router;
  exports.products = products;
  
