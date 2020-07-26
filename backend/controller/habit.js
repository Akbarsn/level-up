const model = require('../models')
const joi = require('joi')
const { GeneralError, BadRequest, NotAcceptable } = require('../utils/errors')

module.exports = {
    async GetAllHabits (req, res, next) {
        const userId = req.user.id

        try {
            const habits = await model.Habit.findAll({
                where: { userId: userId }
            })

            if (habits) {
                res.status(200).json({
                    habits: habits
                })
            } else {
                throw new GeneralError('Query Failed')
            }
        } catch (error) {
            console.log(error)
            const err = new GeneralError('Query Failed')
            next(err)
        }
    },
    async CreateHabit (req, res, next) {
        const userId = req.user.id
        const schema = joi.object().keys({
            title: joi.string().alphanum().max(50).not(null).required(),
            description: joi.string().alphanum(),
            type: joi.number().not(null).required()
        })

        try {
            const { err, value } = schema.validate(req.body)

            if (err !== null && value.title && value.type) {
                const { title, description, type } = value

                const query = await model.Habit.create({
                    title: title,
                    description: description || '',
                    type: type,
                    userId: userId
                })

                if (query) {
                    res.status(200).json(query)
                } else {
                    throw new GeneralError('Query failed')
                }
            } else {
                throw new BadRequest('Data is missing or invalid')
            }
        } catch (error) {
            next(error)
        }
    },
    async UpdateHabit (req, res, next) {
        const id = req.params.id
        const userId = req.user.id
        const schema = joi.object({
            title: joi.string().alphanum().max(50).required().not(null),
            description: joi.string().alphanum(),
            type: joi.number()
        })

        try {
            const habit = await model.Habit.findOne({
                where: {
                    id: id
                }
            })

            if (habit.userId === userId) {
                const { err, value } = schema.validate(req.body)

                if (err !== null && value.title) {
                    const { title, description, type } = value

                    const updateHabit = await model.Habit.update(
                        {
                            title: title || habit.title,
                            description: description || habit.description,
                            type: type || habit.type
                        },
                        {
                            where: { id: id }
                        })

                    if (updateHabit) {
                        res.status(200).json({
                            message: 'Habit successfully updated'
                        })
                    } else {
                        throw new GeneralError('Query failed')
                    }
                } else {
                    throw new BadRequest('Data is missing or invalid')
                }
            } else {
                throw new NotAcceptable('This habit is not yours')
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    },
    async DeleteHabit (req, res, next) {
        const id = req.params.id
        const userId = req.user.id

        try {
            const habit = await model.Habit.findOne({
                where: {
                    id: id
                }
            })

            if (habit.userId === userId) {
                const deleted = await model.Habit.destroy({
                    where: { id: id }
                })

                if (deleted) {
                    res.status(200).json({
                        message: 'Habit successfully deleted'
                    })
                } else {
                    throw new GeneralError('Query failed')
                }
            } else {
                throw new NotAcceptable('This habit is not yours')
            }
        } catch (error) {
            next(error)
        }
    }
}
