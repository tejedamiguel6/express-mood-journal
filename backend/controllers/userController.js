const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// desc Register a new user
// @route POST/api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, age, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('please add required fields')
  }
  // Check user exist
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }

  // hashing password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  // create the user
  const user = await User.create({
    name,
    email,
    age,
    password: hashPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

// desc Authenticate user
//  @route POST/api/login
//  @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // check for user email
  const user = await User.findOne({ email })

  // checking for password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('invalid credentials')
  }

  res.json({ message: 'Login the user' })
})

// desc get current user
//  @route POST/api/user/me
//  @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate jwt token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
