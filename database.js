const mysql = require('mysql')

const dbConnection = mysql.createConnection({
  host: process.env.STACKHERO_MYSQL_HOST,
  user: process.env.STACKHERO_MYSQL_ROOT_PASSWORD,
  password: process.env.STACKHERO_MYSQL_ROOT_PASSWORD,
  database: process.env.DB_NAME
})

dbConnection.connect((error) => {
  if (error) throw error
  console.log('Successfully connected to the database.')
})

module.exports = dbConnection
