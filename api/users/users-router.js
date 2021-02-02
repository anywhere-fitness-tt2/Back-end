const router = require('express').Router()
const Users = require('./users-model')
const restricted = require('../middleware/restricted-middleware')
const {valUserId} = require('../middleware/idValidation')

router.get('/', restricted, (req, res) => {
    Users.getUsers()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.send(err))
})

router.get('/:id', valUserId, restricted, (req, res) => {
    res.status(200).json(req.user)
})

router.put('/:id', valUserId, restricted, (req, res) => {
    const {id} = req.params
    const changes = req.body
    Users.update(id, changes)
        .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.json(err.message)
    })
})

router.delete('/:id', valUserId, restricted, (req, res) => {
    const {id} = req.params

    Users.remove(id)
        .then(deleted => {
            res.json({removed: deleted})
        })
        .catch(err => {
            res.status(500).json({message: err.message })
        })
})


module.exports = router