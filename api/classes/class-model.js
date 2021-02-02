const db = require('../../database/dbConfig')

module.exports = {
    getClasses,
    getClassById,
    getClassAttendees,
    getClassInstructors
}

function getClasses() {
    return db('classes').orderBy('classes.classId')
}

function getClassById(classId) {
    return db('classes')
        .where('classId', classId)
        .first()
}
//returns students enrolled in class
function getClassAttendees(id) {
    return db('classes as c')
        .join('enrolled as e', 'c.classId', 'e.classId')
        .join('users as u', 'u.userId', 'e.userId')
        .select('c.name', 'u.username')
        .where('c.classId', id)
        .where('role', 'student')
}

function getClassInstructors(id) {
    return db('classes as c')
        .join('enrolled as e', 'c.classId', 'e.classId')
        .join('users as u', 'u.userId', 'e.userId')
        .select('c.name', 'u.username')
        .where('c.classId', id)
        .where('role', 'instructor')
}