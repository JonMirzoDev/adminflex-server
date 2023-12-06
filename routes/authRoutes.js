// authRoutes.js
const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

// Export the router
module.exports = router
