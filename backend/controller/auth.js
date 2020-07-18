require('dotenv').config()

const model = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const joi = require('joi')
const { BadRequest, GeneralError, NotAcceptable } = require('../utils/errors')

module.exports = {
    async RegisterHandler (req, res, next) {
        try {
            const schema = joi.object({
                full_name: joi.string().required().not(null),
                email: joi.string().email().required().not(null),
                username: joi.string().alphanum().required().not(null),
                password: joi.string().alphanum().min(6).required().not(null)
            })

            const { error, value } = schema.validate(req.body)

            if (!error) {
                // eslint-disable-next-line camelcase
                const { full_name, email, username, password } = value
                const hashedPassword = await bcrypt.hash(password, 12)

                if (hashedPassword) {
                    const query = await model.User.create({ full_name, email, username, password: hashedPassword })
                    if (query) {
                        res.status(200).json(query)
                    }
                } else {
                    throw new GeneralError('Hash failed')
                }
            } else {
                console.log(error.message)
                throw new BadRequest('Data not valid')
            }
        } catch (error) {
            next(error)
        }
    },
    async LoginHandler (req, res, next) {
        const schema = joi.object({
            username: joi.string().alphanum().required().not(null),
            password: joi.string().min(6).alphanum().required().not(null)
        })

        const { error, value } = schema.validate(req.body)
        try {
            if (!error) {
                const { username, password } = value

                const result = await model.User.findOne({
                    where: { username: username }
                })

                if (result !== null) {
                    const checkPass = await bcrypt.compare(password, result.password)
                    if (checkPass) {
                        const payload = {
                            id: result.id,
                            name: result.full_name
                        }

                        const token = jwt.sign(payload, JWT_KEY)
                        if (token) {
                            res.status(200).json({
                                status: 1,
                                message: 'Login Successfully',
                                data: { token: token }
                            })
                        } else {
                            throw new GeneralError('Failed create token')
                        }
                    } else {
                        throw new NotAcceptable('Wrong password')
                    }
                } else {
                    throw new NotAcceptable('Can\'t find username')
                }
            } else {
                throw new BadRequest('Data not valid')
            }
        } catch (error) {
            next(error)
        }
    }
}
