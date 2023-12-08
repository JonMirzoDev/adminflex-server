const mysqlx = require('@mysql/xdevapi')

;(async () => {
  try {
    const session = await mysqlx.getSession({
      host: process.env.STACKHERO_MYSQL_HOST,
      port: process.env.STACKHERO_MYSQL_PORT,
      user: process.env.STACKHERO_MYSQL_USER,
      password: process.env.STACKHERO_MYSQL_ROOT_PASSWORD,
      ssl: true
    })

    console.log('Successfully connected to the database.')

    await session.close()
  } catch (err) {
    console.error('Error connecting to the database:', err)
    process.exit(1)
  }
})()
