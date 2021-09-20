const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router(); 

const product = [];  // create array object

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html')); //path join detects op system
     // sends a response using express send function
    // res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});
// app.post only triggers on post requests vs. app.get triggers on get requests
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title})
    res.redirect('/'); // redirect the url to /
})

exports.routes = router;
exports.products = product;