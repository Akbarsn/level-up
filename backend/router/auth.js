const router = require('express').Router()
const {
    LoginHandler,
    RegisterHandler
} = require('../controller/auth')

router.post('/register', RegisterHandler)

router.post('/login', LoginHandler)

module.exports = router
