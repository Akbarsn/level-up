const router = require('express').Router()
const { GetSaving, CreateSaving } = require('../controller/saving')

router.get('/', GetSaving)
    .post('/', CreateSaving)

module.exports = router
