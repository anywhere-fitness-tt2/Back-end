const db = require('../../database/dbConfig')

module.exports = {getUsers, add, getById, getBy, update, remove, getUserClasses, dropClass, enroll}

function getUsers() {
    return db('users')
}

function getBy(filter) {
    return db('users as u')
        .where(filter)
}

function getById(userId) {
    return db('users as u')
        .select('u.userId', 'u.username', 'u.email', 'u.role')
        .where('u.userId', userId)
        .first()
}

function getUserClasses(id) {
    return db('classes as c')
        .join('enrolled as e', 'c.classId', 'e.classId')
        .join('users as u', 'u.userId', 'e.userId')
        .select('e.id','c.name', 'c.type', 'c.time', 'c.duration', 'c.intensityLvl', 'c.location')
        .where('u.userId', id)

}

async function add(user) {
    const [id] = await db('users').insert(user, 'userId')
    return getById(id)
}

function update(id, changes) {
    return db('users')
        .where('userId', id)
        .update(changes)
        .then(count => {
            return count > 0 ? getById(id) : null
        })
}

async function remove(id) {
    const rmvd = await getById(id)
    return db('users')
        .where('userId', id)
        .del()
        .then(() => {
            return rmvd
        })
}

async function enroll(body) {
    return db('enrolled').insert(body)
}

async function dropClass(id) {
    return db('enrolled')
        .where('id', id)
        .del()
}

