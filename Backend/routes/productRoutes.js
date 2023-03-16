const express = require('express');
const productController = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/product', productController.getAllProducts)
router.post('/admin/product/new',isAuthenticatedUser ,authorizeRoles('admin') ,  productController.createProduct)
router.put('/admin/product/:id', isAuthenticatedUser ,authorizeRoles('admin') , productController.updateProduct)
router.delete('/admin/product/:id', isAuthenticatedUser ,authorizeRoles('admin') ,  productController.deleteProduct)
router.get('/product/:id',productController.getProductDetails)
router.post('/product/review', isAuthenticatedUser, productController.createProductReview)


module.exports = router