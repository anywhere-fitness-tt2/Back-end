const router = require('express').Router()
const Users = require('./users-model')

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.send(err))
})

router.get('/:id', (req, res) => {
    Users.getById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.send(err.message)
        })
})



module.exports = router