const router = require('express').Router()

const AuthRoute = require('./auth')
const HomepageRoute = require('./homepage')
const TaskRoute = require('./task')
const HabitRoute = require('./habit')
const { CheckToken } = require('../middleware/checkToken')

router.use(AuthRoute)

router.use('/homepage', CheckToken, HomepageRoute)

router.use('/task', CheckToken, TaskRoute)

router.use('/habit', CheckToken, HabitRoute)

module.exports = router
