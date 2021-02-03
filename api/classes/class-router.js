const router = require('express').Router()
const Classes = require('./class-model')
const restricted = require('../middleware/restricted-middleware.js')
const roleRestricted = require('../middleware/rolerestricted-middleware')
const {valClassId} = require('../middleware/idValidation')

router.get('/', restricted,(req, res) => {
    Classes.getClasses()
        .then(cls => {
            res.json(cls)
        })
        .catch(err => {
            res.json(err.message)
        })
})

router.get('/:id', valClassId, restricted, (req, res) => {
    res.status(200).json(req.cls)
})

router.get('/:id/students', valClassId, restricted, (req, res) => {
    Classes.getClassAttendees(req.cls.classId)
        .then(students => {
            res.json(students)
        })
        .catch(err => {
            res.send(err.message)
        })
})

router.get('/:id/instructors', valClassId, restricted, (req, res) => {
    Classes.getClassInstructors(req.cls.classId)
        .then(instructors => {
            res.json(instructors)
        })
        .catch(err => {
            res.send(err.message)
        })
})

router.post('/', restricted, roleRestricted('instructor'), (req, res) => {
    Classes.addClass(req.body)
        .then(newClass => {
            res.json(newClass)
        })
        .catch(err => {
            res.json(err.message)
        })
})

router.put('/:id', valClassId, restricted, roleRestricted('instructor'), (req, res) => {
    const {id} = req.params
    const changes = req.body
    Classes.updateClass(id, changes)
        .then(user => {
        res.status(200).json(user)
        })
        .catch(err => {
            res.json(err.message)
        })
})

router.delete('/:id', valClassId, restricted, roleRestricted('instructor'), (req, res) => {
    const {id} = req.params
    Classes.removeClass(id)
        .then(deleted => {
            res.json({removed: deleted})
        })
        .catch(err => {
            res.status(500).json({message: 'Classes must not have enrolled users before deletion' })
        })
})



module.exports = router