const router = require('express').Router()
const Users = require('./users-model')
const restricted = require('../middleware/restricted-middleware')

router.get('/', restricted, (req, res) => {
    Users.getUsers()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.send(err))
})

router.get('/:id', restricted, (req, res) => {
    Users.getById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.send(err.message)
        })
})

router.put('/:id', restricted, (req, res) => {
    const {id} = req.params
    const changes = req.body

    Users.getById(id)
        .then(user => {
            if(user) {
                return Users.update(id, changes)
            } else {
                res.status(404).json({ message: 'Could not find user with given id' })
            }
        })
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.delete('/:id', restricted, (req, res) => {
    const {id} = req.params

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({removed: deleted})
            } else {
                res.status(404).json({message: 'Could not find user with given id'})
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message })
        })
})


module.exports = router