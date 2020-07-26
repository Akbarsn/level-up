const router = require('express').Router()
const { GetTask, CreateTask, UpdateTask, DeleteTask } = require('../controller/task')

router.get('/', GetTask)
    .post('/', CreateTask)
    .put('/:id', UpdateTask)
    .delete('/:id', DeleteTask)

module.exports = router
