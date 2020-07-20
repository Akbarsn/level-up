const router = require('express').Router()
const { HomepageHandler } = require('../controller/homepage')
const { CheckToken } = require('../middleware/checkToken')

router.get('/homepage', CheckToken, HomepageHandler)

module.exports = router
