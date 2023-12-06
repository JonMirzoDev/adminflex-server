// userModel.js
const db = require('../database')

const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO users (name, email, password, registrationTime) VALUES (?, ?, ?, ?)'
    db.query(
      query,
      [userData.name, userData.email, userData.password, new Date()],
      (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.insertId)
        }
      }
    )
  })
}

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT id, name, email, lastLoginTime, registrationTime, status FROM users'
    db.query(query, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?'
    db.query(query, [email], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results[0])
      }
    })
  })
}

const updateUserStatus = (userId, status) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET status = ? WHERE id = ?'
    db.query(query, [status, userId], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const updateLastLoginTime = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET lastLoginTime = NOW() WHERE id = ?'
    db.query(query, [userId], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM users WHERE id = ?'
    db.query(query, [userId], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUserStatus,
  getAllUsers,
  updateLastLoginTime,
  deleteUser
}
