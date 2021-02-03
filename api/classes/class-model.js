const db = require('../../database/dbConfig')

module.exports = {
    getClasses,
    getClassById,
    getClassAttendees,
    getClassInstructors,
    addClass,
    updateClass,
    removeClass
}

function getClasses() {
    return db('classes as c')
    .join('enrolled as e', 'c.classId', 'e.classId')
    .join('users as u', 'u.userId', 'e.userId')
    .select(
        'c.classId', 
        'u.username',
        'c.name',
        'c.type',
        'c.time',
        'c.duration',
        'c.intensityLvl',
        'c.location',
        'c.attendees',
        'c.maxSize'
    )
    .where('u.role', 'instructor')
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
//returns instructors enrolled in class

function getClassInstructors(id) {
    return db('classes as c')
        .join('enrolled as e', 'c.classId', 'e.classId')
        .join('users as u', 'u.userId', 'e.userId')
        .select('c.name', 'u.username')
        .where('c.classId', id)
        .where('role', 'instructor')
}

async function addClass(newClass) {
    const [id] = await db('classes').insert(newClass, 'classId')
    return getClassById(id)
}

function updateClass(id, changes) {
    return db('classes')
        .where('classId', id)
        .update(changes)
        .then(count => {
            return count > 0 ? getClassById(id) : null
        })
}

async function removeClass(id) {
    const rmvd = await getClassById(id)
    return db('classes')
        .where('classId', id)
        .del()
        .then(() => {
            return rmvd
        })
}
