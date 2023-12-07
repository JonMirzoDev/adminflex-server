const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const authenticateToken = require('./middlewares/authenticateToken')

const app = express()
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', authenticateToken, userRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
