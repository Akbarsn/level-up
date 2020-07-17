require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.NODE_ENV !== 'DEVELOPMENT' ? process.env.PORT : 5000

app.get('/ping', (req, res, next) => {
  res.json({
    message: 'Pong'
  })
})

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
