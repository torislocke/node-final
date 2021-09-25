const path = require('path');
const express = require('express');


const rootDir = require('../utils/path');
const { products } = require('./admin');
const router = express.Router(); 


router.get('/',(req, res, next) => { // you don't need to put the root of '/' as it is the default
    console.log('second middleware line')
    res.render('shop', { // res.render uses express the template engine defined
        prods: products, // binding products to the new var name of prods 
        pageTitle: 'Shop', // creating var of page title to use in navigation
        path: '/'}); //path join detects op system
        // hasProducts: products.length > 0,  // if using handelbars engine
        // activeShop: true;  // if using handlebars enging
        // productCSS: true; iff using handlebars engine

});

module.exports = router;