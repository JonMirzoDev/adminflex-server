const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { getAllUsers } = require('./userQueries')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' })
})

// Test route to fetch all users
app.get('/test-db', (req, res) => {
  getAllUsers()
    .then((users) => res.json(users))
    .catch((error) => {
      console.error('Database Error:', error)
      res.status(500).send('Error in fetching users')
    })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
