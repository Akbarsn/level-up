const { GeneralError } = require('../utils/errors')

const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: err.message
    })
}

const handleNotFound = (req, res, next) => {
    return res.status(404).json({
        status: 'error',
        message: 'API Endpoint not found'
    })
}

module.exports = { handleErrors, handleNotFound }
