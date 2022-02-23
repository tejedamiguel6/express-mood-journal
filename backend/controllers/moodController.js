const asyncHandler = require('express-async-handler')

// @desc Get Moods
// @route GET /api/moods
// @access Private
const getMoods = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get Mood' })
})

// @desc Get Moods
// @route POST /api/moods/
// @access Private
const createMood = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('please select a mood')
  }

  res.status(200).json({ message: 'Create a mood' })
})

// @desc Get Moods
// @route PUT /api/moods/:id
// @access Private
const updateMood = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update mood id${req.params.id}` })
})

// @desc Get Moods
// @route DELETE /api/moods/:id
// @access Private
const deleteMood = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete goal id ${req.params.id}` })
})

module.exports = {
  getMoods,
  createMood,
  updateMood,
  deleteMood,
}
