const router = require('express').Router()
const { HomepageHandler } = require('../controller/homepage')

router.get('/', HomepageHandler)

module.exports = router
