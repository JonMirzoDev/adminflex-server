const { getSession } = require('../database')

const executeQuery = async (sql, params = []) => {
  const session = await getSession()
  try {
    let result
    if (params.length > 0) {
      result = await session.sql(sql).bind(params).execute()
    } else {
      result = await session.sql(sql).execute()
    }
    return result
  } catch (error) {
    console.error('Error in executeQuery:', error)
    throw error
  }
}

const createUser = async (userData) => {
  const sql =
    'INSERT INTO users (name, email, password, registrationTime) VALUES (?, ?, ?, ?)'
  const params = [userData.name, userData.email, userData.password, new Date()]
  const result = await executeQuery(sql, params)
  return result.getAutoIncrementValue()
}

const getAllUsers = async () => {
  const sql =
    'SELECT id, name, email, lastLoginTime, registrationTime, status FROM users'
  try {
    const results = await executeQuery(sql)
    return results
  } catch (error) {
    console.error('Error in getAllUsers:', error)
    throw error
  }
}

const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?'
  try {
    const session = await getSession()
    const result = await session.sql(sql).bind([email]).execute()
    const userRow = result.fetchOne()
    const user = {
      id: userRow[0],
      name: userRow[1],
      email: userRow[2],
      password: userRow[3],
      status: userRow[5]
    }
    return user
  } catch (error) {
    console.error('Error in findUserByEmail:', error)
    throw error
  }
}

const updateUserStatus = async (userId, status) => {
  const sql = 'UPDATE users SET status = ? WHERE id = ?'
  const results = await executeQuery(sql, [status, userId])
  return results.getAffectedItemsCount()
}

const updateLastLoginTime = async (userId) => {
  const sql = 'UPDATE users SET lastLoginTime = NOW() WHERE id = ?'
  const results = await executeQuery(sql, [userId])
  return results.getAffectedItemsCount()
}

const deleteUser = async (userId) => {
  const sql = 'DELETE FROM users WHERE id = ?'
  const results = await executeQuery(sql, [userId])
  return results.getAffectedItemsCount()
}

module.exports = {
  createUser,
  getAllUsers,
  findUserByEmail,
  updateUserStatus,
  updateLastLoginTime,
  deleteUser
}
