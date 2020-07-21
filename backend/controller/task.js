/* eslint-disable camelcase */
const model = require('../models')
const joi = require('joi')
const { GeneralError, BadRequest, NotAcceptable } = require('../utils/errors')

module.exports = {
    async GetTask (req, res, next) {
        const userId = req.user.id
        try {
            const tasks = await model.Task.findAll({
                where: {
                    userId: userId
                }
            })

            res.status(200).json({
                tasks: tasks
            })
        } catch (error) {
            next(error)
        }
    },
    async CreateTask (req, res, next) {
        const userId = req.user.id

        try {
            const schema = joi.object({
                title: joi.string().required().not(null).max(50),
                description: joi.string(),
                priority: joi.number().integer().min(0).max(4),
                due_date: joi.date()
            })

            const { err, value } = schema.validate(req.body)
            if (err !== null) {
                let { title, description, priority, due_date } = value
                if (title == null) {
                    throw new BadRequest('Data is missing or not valid')
                }
                if (priority == null) priority = 0

                const task = await model.Task.create({
                    title,
                    description,
                    priority,
                    due_date,
                    userId: userId
                })

                if (task) {
                    res.status(200).json(task)
                } else {
                    throw new GeneralError('Failed at create task')
                }
            } else {
                throw new BadRequest('Data is missing or not valid')
            }
        } catch (error) {
            next(error)
        }
    },
    async DeleteTask (req, res, next) {
        const id = req.params.id
        const userId = req.user.id

        try {
            const task = await model.Task.findOne({
                where: {
                    id: id
                }
            })

            if (userId === task.userId) {
                if (task) {
                    const deleteTask = await model.Task.destroy({
                        where: {
                            id: id
                        }
                    })
                    if (deleteTask) {
                        res.status(200).json({
                            message: 'Task Deleted'
                        })
                    } else {
                        throw new GeneralError('Query failed')
                    }
                } else {
                    throw new NotAcceptable('Task did\'nt found')
                }
            } else {
                throw new NotAcceptable('Task isn\'t yours ')
            }
        } catch (error) {
            next(error)
        }
    },
    async UpdateTask (req, res, next) {
        const id = req.params.id
        const userId = req.user.id

        try {
            const task = await model.Task.findOne({
                where: {
                    id: id
                }
            })

            if (userId === task.userId) {
                const schema = joi.object({
                    title: joi.string().required().not(null).max(50),
                    description: joi.string(),
                    priority: joi.number().integer().min(0).max(4),
                    due_date: joi.date()
                })

                const { err, value } = schema.validate(req.body)

                if (value.title == null) throw new BadRequest('Data is missing or invalid')

                if (err !== null) {
                    // eslint-disable-next-line new-cap
                    const updatedTask = await model.Task.update(
                        {
                            title: value.title ? value.title : task.title,
                            description: value.description ? value.description : task.description,
                            priority: value.priority ? value.priority : task.priority,
                            due_date: value.due_date ? value.due_date : task.due_date
                        },
                        {
                            where: {
                                id: id
                            }
                        })

                    if (updatedTask) {
                        res.status(200).json({
                            message: 'Task Updated'
                        })
                    } else {
                        throw new GeneralError('Query failed')
                    }
                } else {
                    throw new BadRequest('Missing data or data is not valid')
                }
            } else {
                throw new NotAcceptable('This task is not yours')
            }
        } catch (error) {
            next(error)
        }
    }
}
