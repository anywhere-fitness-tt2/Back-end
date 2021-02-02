const Users = require('../users/users-model')
const Classes = require('../classes/class-model')

module.exports = { valUserId}

async function valUserId(req, res, next) {
    try {
        const user = await Users.getById(req.params.id)
        if (user) {
            req.user = user
            next()
        } else {
            res.status(404).json(`User with ID: ${req.params.id} not found`)
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}