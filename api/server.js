const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./auth/auth-router')
const UserRouter = require('./users/users-router')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', UserRouter)

server.get('/', (req, res) => {
    res.json('we are live')
})

module.exports = server;