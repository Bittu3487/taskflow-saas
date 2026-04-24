const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check user exists
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Save user
    user = new User({ name, email, password: hashedPassword })
    await user.save()

    // Token banao
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user._id, name, email } })

  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // User check
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    // Password check
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    // Token banao
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user._id, name: user.name, email } })

  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router