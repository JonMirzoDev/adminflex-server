const userModel = require('../models/userModel')

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Controller to update user status
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    await userModel.updateUserStatus(id, status)
    res.send('User status updated successfully')
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Controller to delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await userModel.deleteUser(id)
    res.send('User deleted successfully')
  } catch (error) {
    res.status(500).send(error.message)
  }
}
