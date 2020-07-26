const model = require('../models')
const joi = require('joi')
const { GeneralError, BadRequest, NotAcceptable } = require('../utils/errors')

module.exports = {
    async GetHistoryBasedOnID (req, res, next) {

    },
    async CreateTransaction (req, res, next) {
        const userId = req.user.id

        try {
            const saving = await model.Saving.findOne({
                where: {
                    userId: userId
                }
            })

            const schema = joi.object({
                type: joi.number().required().not(null),
                description: joi.string().alphanum(),
                amount: joi.number().required().not(null)
            })

            const { err, value } = schema.validate(req.body)

            if (err !== null && value.type && value.amount) {
                const { type, description, amount } = value

                const history = await model.History.create({
                    type,
                    description,
                    amount,
                    savingId: saving.id
                })

                if (history) {
                    res.status(200).json(history)
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
    async UpdateTransaction (req, res, next) {
        const userId = req.user.id
        const historyId = req.params.id

        try {
            const saving = await model.Saving.findOne({
                where: {
                    userId: userId
                }
            })

            const history = await model.History.findOne({
                where: { id: historyId }
            })

            if (history.savingId === saving.id) {
                const schema = joi.object({
                    type: joi.number(),
                    description: joi.string().alphanum(),
                    amount: joi.number().not(null || 0)
                })

                const { err, value } = schema.validate(req.body)
                if (err !== null) {
                    const { type, description, amount } = value
                    const updateHistory = await model.History.update(
                        {
                            type: type || history.type,
                            description: description || history.description,
                            amount: amount || history.amount
                        },
                        {
                            where: { id: historyId }
                        }
                    )

                    if (updateHistory) {
                        res.status(200).json({
                            message: 'History updated'
                        })
                    } else {
                        throw new GeneralError('Query Failed')
                    }
                } else {
                    throw new BadRequest('Data is missing or invalid')
                }
            } else {
                throw new NotAcceptable('This history is not yours')
            }
        } catch (error) {
            next(error)
        }
    },
    async DeleteTransaction (req, res, next) {
        const userId = req.user.id
        const historyId = req.params.id

        try {
            const saving = await model.Saving.findOne({
                where: {
                    userId: userId
                }
            })

            const history = await model.History.findOne({
                where: { id: historyId }
            })

            if (history.savingId === saving.id) {
                const deleteHistory = await model.History.destroy({
                    where: { id: historyId }
                })

                if (deleteHistory) {
                    res.status(200).json({
                        message: 'History Deleted'
                    })
                } else {
                    throw new GeneralError('Query failed')
                }
            } else {
                throw new NotAcceptable('This history is not yours')
            }
        } catch (error) {
            next(error)
        }
    }
}
