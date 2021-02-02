const Users = require('../users/users-model')
const Classes = require('../classes/class-model')

module.exports = { valUserId, valClassId }

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

async function valClassId(req, res, next) {
    try {
        const cls = await Classes.getClassById(req.params.id)
        if (cls) {
            req.cls = cls
            next()
        } else {
            res.status(404).json(`Class with ID: ${req.params.id} not found`)
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}