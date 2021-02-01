const db = require('../../database/dbConfig')

module.exports = {getUsers, add, getById, getBy}

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

async function add(user) {
    const [id] = await db('users').insert(user, 'userId')
    return getById(id)
}