const express = require('express')
const router = express.Router()
const {
  getMoods,
  createMood,
  updateMood,
  deleteMood,
} = require('../controllers/moodController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getMoods)

router.post('/', protect, createMood)

router.put('/:id', protect, updateMood)

router.delete('/:id', protect, deleteMood)

module.exports = router
