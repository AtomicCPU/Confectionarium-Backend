const express = require('express');
const buyController = require('../controllers/buyController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/checkout-session/:productId',
  authController.protect,
  buyController.getCheckoutSession
);

module.exports = router;
