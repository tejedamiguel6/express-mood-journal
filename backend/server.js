const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

connectDB()

const app = express()

// adding middleware

app.use(express.json())

// url encoded
app.use(express.urlencoded({ extended: false }))

app.use('/api/mood', require('./routes/moodRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server srated on port: ${port}`.rainbow))
