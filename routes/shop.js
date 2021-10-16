const path = require('path');

const express = require('express');


const shopController = require('../controllers/shop');
// import middleware to determine if user is logged in or not
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

// looks left to right
// protect route through middleware to check if looged in or not
router.get('/cart', isAuth, shopController.getCart);

// protect route through middleware to check if looged in or not
router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

module.exports = router;
