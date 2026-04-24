require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected! ✅'))
  .catch((err) => console.log('DB Error:', err))

app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API Running! 🚀' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})