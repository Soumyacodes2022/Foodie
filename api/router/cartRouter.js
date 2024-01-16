const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')

//route the cart-items
router.get('/', cartController.getCartByEmail);
router.post('/', cartController.postAddToCart);

module.exports = router