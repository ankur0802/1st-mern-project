const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

// router.get('/user', )
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
// router.put('/user/:id',)
// router.delete('/user/:id', )
// router.get('/user/:id',)


module.exports = router