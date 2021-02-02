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

router.get('/:id/classes', valUserId, restricted, (req, res) => {
    Users.getUserClasses(req.params.id)
        .then(classes => {
            res.json(classes)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
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

router.post('/enrollment', restricted, (req, res) => {
    req.body.userId = req.decodedJwt.subject
    Users.enroll(req.body)
        .then(enrolled => {
            res.json('enrollment succesful')
        })
        .catch(err => {
            res.json(err.message)
        })
})

router.delete('/enrollment/:id', restricted, (req, res) => {
    const {id} = req.params

    Users.dropClass(id)
        .then(deleted => {
            res.json('Class was dropped')
        })
        .catch(err => {
            res.status(500).json({message: err.message })
        })
})


module.exports = router