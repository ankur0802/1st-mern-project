const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

const router = express.Router();


router.post('/order/new',isAuthenticatedUser, orderController.newOrder)
router.get('/order/:id',isAuthenticatedUser , orderController.getSingleOrder)
router.get('/orders/me',isAuthenticatedUser , orderController.myOrder)
router.get('/admin/orders',isAuthenticatedUser ,authorizeRoles('admin') , orderController.getAllOrder)
router.put('/admin/orders/:id',isAuthenticatedUser ,authorizeRoles('admin') , orderController.updateOrder)
router.delete('/admin/orders/:id',isAuthenticatedUser ,authorizeRoles('admin') , orderController.updateOrder)



module.exports = router;