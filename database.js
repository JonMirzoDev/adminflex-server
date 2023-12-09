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
  try {
    // Attempt to reuse the existing session or create a new one
    session = session || (await mysqlx.getSession(config))
    await session.sql('SELECT 1').execute() // Dummy query to check connection
    console.log('Successfully connected to the database.')
  } catch (err) {
    console.error('Error connecting to the database:', err)
    if (session) {
      await session.close() // Close the previous session if it exists
      session = null // Reset session variable
    }
    // Try to reconnect
    session = await mysqlx.getSession(config)
    console.log('Reconnected to the database.')
  }
  return session
}

const closeSession = async () => {
  if (session) {
    try {
      await session.close()
      console.log('Database session closed.')
    } catch (err) {
      console.error('Error closing the database session:', err)
    }
    session = null // Reset session variable
  }
}

module.exports = {
  getSession,
  closeSession
}
