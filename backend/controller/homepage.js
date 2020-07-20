const model = require('../models')
const { GeneralError } = require('../utils/errors')

module.exports = {
    async HomepageHandler (req, res, next) {
        const userID = req.user.id

        try {
            const data = await model.User.findOne({
                where: {
                    id: userID
                },
                include: ['tasks', 'habits', 'saving']
            })

            if (data) {
                res.status(200).json(data)
            } else {
                throw new GeneralError('Query failed')
            }
        } catch (error) {
            next(error)
        }
    }
}
