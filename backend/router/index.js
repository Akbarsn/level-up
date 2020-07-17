const router = require('express').Router()
const AuthRoute = require('./auth')

router.use(AuthRoute)

module.exports = router
