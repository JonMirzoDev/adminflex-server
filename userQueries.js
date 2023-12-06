const dbConnection = require('./database')

function createUser(name, email, password, registrationTime) {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO users (name, email, password, registrationTime) VALUES (?, ?, ?, ?)'
    dbConnection.query(
      query,
      [name, email, password, registrationTime],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users'
    dbConnection.query(query, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?'
    dbConnection.query(query, [email], (error, results) => {
      if (error) reject(error)
      resolve(results[0])
    })
  })
}

function updateUserStatus(userId, status) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET status = ? WHERE id = ?'
    dbConnection.query(query, [status, userId], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

module.exports = { createUser, getAllUsers, findUserByEmail, updateUserStatus }
