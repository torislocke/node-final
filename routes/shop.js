const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  npconsole.log('shop.js', adminData.products);
  const products = adminData.products;
  res.render('shop', {prods: products, docTitle: 'Shop'}); //pug version
});

module.exports = router;