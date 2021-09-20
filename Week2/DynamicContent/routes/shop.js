const path = require('path');
const express = require('express');


const rootDir = require('../utils/path');
const { products } = require('./admin');
const router = express.Router(); 


router.get('/',(req, res, next) => {
    console.log('second middleware line')
    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'}); //path join detects op system
});

module.exports = router;