const mysql = require('mysql')
require('dotenv').config()

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_app_db'
})

dbConnection.connect((error) => {
  if (error) throw error
  console.log('Successfully connected to the database.')
})

module.exports = dbConnection
