const router = require('express').Router()
const { CreateTransaction, DeleteTransaction, UpdateTransaction } = require('../controller/history')

router.post('/', CreateTransaction)

router.put('/:id', UpdateTransaction)

router.delete('/:id', DeleteTransaction)

module.exports = router
