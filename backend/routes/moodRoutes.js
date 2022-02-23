const express = require('express')
const res = require('express/lib/response')

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'get Moods' })
})

router.post('/', (req, res) => {
  res.status(200).json({ message: 'Create a mood' })
})

router.put('/:id', (req, res) => {
  res.status(200).json({ message: `update your mood ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `delete your mood${req.params.id}` })
})

module.exports = router
