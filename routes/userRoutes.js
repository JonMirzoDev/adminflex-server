const express = require('express')
const userController = require('../controllers/userController')
const authenticateToken = require('../middlewares/authenticateToken')
const router = express.Router()

// Protected route to get all users
router.get('/', authenticateToken, userController.getAllUsers)

// Protected route to update user status
router.patch('/:id/status', authenticateToken, userController.updateUserStatus)

// Protected route to delete a user
router.delete('/:id', authenticateToken, userController.deleteUser)

module.exports = router
