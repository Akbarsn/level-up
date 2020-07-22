const router = require('express').Router()
const { GetAllHabits, CreateHabit, UpdateHabit, DeleteHabit } = require('../controller/habit')

router.get('/', GetAllHabits)

router.post('/', CreateHabit)

router.put('/:id', UpdateHabit)

router.delete('/:id', DeleteHabit)

module.exports = router
