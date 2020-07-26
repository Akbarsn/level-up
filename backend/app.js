require('dotenv').config()
const PORT = process.env.NODE_ENV !== 'development' ? process.env.PORT : 5000
const { handleErrors, handleNotFound } = require('./middleware/handleError')

const express = require('express')
const app = express()
const cors = require('cors')
const route = require('./router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('*', cors())
app.use(cors())

app.get('/ping', (req, res, next) => {
    res.json({
        message: 'Pong'
    })
})

app.use(route)

app.use(handleErrors)
app.use(handleNotFound)

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})
