const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ message: 'No token, access denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId

    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.userEmail = user.email
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}