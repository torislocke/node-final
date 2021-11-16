const path = require('path');

const express = require('express');
//import body function from express validator
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
// import middleware to determine if user is logged in or not
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// looks left to right
// first look to see if user is logged in, then look at admin controller
router.get('/add-product', isAuth, adminController.getAddProduct);

// protect route through middleware to check if looged in or not
router.get('/products', isAuth, adminController.getProducts);

// validate the steps of adding a product title, image url, description
router.post(
  '/add-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      // remove excess white space at beginning or end of title
      .trim(),
    body('imageUrl').isURL(), // built in validator
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);

// protect route through middleware to check if looged in or not
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title')
      .isString() // allows white space in title
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

// protect route through middleware to check if looged in or not
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
