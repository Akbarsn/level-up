const router = require('express').Router()

const AuthRoute = require('./auth')
const HomepageRoute = require('./homepage')

router.use(AuthRoute)

router.use(HomepageRoute)

module.exports = router
