require('dotenv').config()

const { NoToken, GeneralError } = require('../utils/errors')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

module.exports = {
    async CheckToken (req, res, next) {
        const header = req.headers.authorization
        try {
            if (header) {
                const token = header.split(' ')[1]

                if (token) {
                    const payload = jwt.verify(token, JWT_KEY)

                    if (payload) {
                        req.user = payload
                        console.log(payload)
                        next()
                    } else {
                        throw new GeneralError('Payload not found')
                    }
                } else {
                    throw new NoToken('Token missing or invalid')
                }
            } else {
                throw new NoToken('Token missing or invalid')
            }
        } catch (error) {
            next(error)
        }
    }
}
