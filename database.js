const mysqlx = require('@mysql/xdevapi')

const config = {
  host: process.env.STACKHERO_MYSQL_HOST,
  port: process.env.STACKHERO_MYSQL_PORT,
  user: process.env.STACKHERO_MYSQL_USER,
  password: process.env.STACKHERO_MYSQL_ROOT_PASSWORD,
  schema: process.env.DB_NAME,
  ssl: true
}

let session = null

const getSession = async () => {
  if (session === null || !session.isOpen()) {
    // Check if the session is open
    try {
      if (session !== null) {
        // Close the previous session if it exists and is not open
        await session.close()
        console.log('Closed the previous database session.')
      }
      session = await mysqlx.getSession(config)
      console.log('Successfully connected to the database.')
    } catch (err) {
      console.error('Error connecting to the database:', err)
      throw err // Rethrow the error to handle it where getSession is called
    }
  }
  return session
}

const closeSession = async () => {
  if (session !== null) {
    try {
      await session.close()
      console.log('Database session closed.')
    } catch (err) {
      console.error('Error closing the database session:', err)
      throw err // Rethrow the error to handle it where closeSession is called
    } finally {
      session = null // Ensure session is set to null after closing
    }
  }
}

module.exports = {
  getSession,
  closeSession
}
