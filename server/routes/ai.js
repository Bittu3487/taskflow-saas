const express = require('express')
const router = express.Router()
const { GoogleGenerativeAI } = require('@google/generative-ai')
const auth = require('../middleware/auth')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

router.post('/suggest', auth, async (req, res) => {
  try {
    const { title } = req.body

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `You are a task management assistant.
    Given this task title: "${title}"
    Respond in valid JSON only like this:
    {"description": "brief task description here", "priority": "medium"}
    Priority must be: low, medium, or high only.
    No extra text, only JSON.`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, '').trim()
    const response = JSON.parse(clean)

    res.json(response)

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'AI service error' })
  }
})

module.exports = router