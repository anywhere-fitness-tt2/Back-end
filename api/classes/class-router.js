const router = require('express').Router()
const Classes = require('./class-model')
const restricted = require('../middleware/restricted-middleware.js')
const roleRestricted = require('../middleware/rolerestricted-middleware')

router.get('/', restricted,(req, res) => {
    Classes.getClasses()
        .then(cls => {
            res.json(cls)
        })
        .catch(err => {
            res.json(err.message)
        })
})

router.get('/:id', restricted, (req, res) => {
    const{id} = req.params

    Classes.getClassById(id)
        .then(cls => {
            if(cls) {
                res.json(cls)
            } else {
                res.status(404).json({ message: 'Could not find class with given id.'})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

router.get('/:id/enrolled', restricted, (req, res) => {
    Classes.getClassAttendees(req.params.id)
    .then(students => {
        res.json(students)
    })
    .catch(err => {
        res.send(err.message)
    })
})

router.get('/:id/instructors', restricted, (req, res) => {
    Classes.getClassInstructors(req.params.id)
    .then(instructors => {
        res.json(instructors)
    })
    .catch(err => {
        res.send(err.message)
    })
})

// router.post('/', restricted, roleRestricted, (req, res) => {

// })



module.exports = router