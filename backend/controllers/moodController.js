const asyncHandler = require('express-async-handler')

const Mood = require('../models/moodModel')
const User = require('../models/userModel')

// @desc Get Moods
// @route GET /api/moods
// @access Private
const getMoods = asyncHandler(async (req, res) => {
  const moods = await Mood.find({ user: req.user.id })
  res.status(200).json(moods)
})

// @desc Get Moods
// @route POST /api/moods/
// @access Private
const createMood = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('please select a mood')
  }
  const mood = await Mood.create({
    mood: req.body.mood,
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(mood)
})

// @desc Get Moods
// @route PUT /api/moods/:id
// @access Private
const updateMood = asyncHandler(async (req, res) => {
  const mood = await Mood.findById(req.params.id)

  if (!mood) {
    res.status(400)
    throw new Error('That mood is not found')
  }

  const user = await User.findById(req.user.id)
  // checking for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // checking logged in user matches mood user
  if (mood.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedMood = await Mood.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json({ updatedMood })
})

// @desc Get Moods
// @route DELETE /api/moods/:id
// @access Private
const deleteMood = asyncHandler(async (req, res) => {
  const mood = await Mood.findById(req.params.id)
  if (!mood) {
    res.status(400)
    throw new Error('Mood not found.')
  }

  const user = await User.findById(req.user.id)
  // checking for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // checking logged in user matches mood user
  if (mood.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await mood.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getMoods,
  createMood,
  updateMood,
  deleteMood,
}
