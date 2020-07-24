/* eslint-disable camelcase */
const model = require('../models')
const { GeneralError, BadRequest } = require('../utils/errors')
const joi = require('joi')

module.exports = {
    async GetSaving (req, res, next) {
        const userId = req.user.id

        try {
            const saving = await model.Saving.findOne({
                where: {
                    userId: userId
                }
            })

            const history = await model.History.findAll({
                where: {
                    savingId: saving.id
                }
            })

            if (saving) {
                res.status(200).json({
                    saving: saving,
                    histories: history
                })
            } else {
                throw new GeneralError('Query failed')
            }
        } catch (error) {
            next(error)
        }
    },
    async CreateSaving (req, res, next) {
        const userId = req.user.id

        try {
            const schema = joi.object({
                total_amount: joi.number().required().not(null)
            })

            const { err, value } = schema.validate(req.body)
            console.log(err)
            console.log(value.total_amount)
            if (err !== null && value.total_amount) {
                const { total_amount } = value

                const saving = await model.Saving.create({
                    total_amount: total_amount,
                    monthly_amount: total_amount,
                    userId: userId
                })

                if (saving) {
                    res.status(200).json(saving)
                } else {
                    throw new GeneralError('Query failed')
                }
            } else {
                throw new BadRequest('Data is missing or invalid')
            }
        } catch (error) {
            next(error)
        }
    }
}
