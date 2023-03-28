const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/payment/process',isAuthenticatedUser, paymentController.processPayment)
router.get('/stripeapikey',isAuthenticatedUser, paymentController.sendStripeApiKey)


module.exports = router;

