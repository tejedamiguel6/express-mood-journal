const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.get('/api/mood', (req, res) => {
  res.json({ message: 'cool shit about to happen' })
})

app.use('/api/mood', require('./routes/moodRoutes'))

app.listen(port, () => console.log(`server srated on port: ${port}`))
