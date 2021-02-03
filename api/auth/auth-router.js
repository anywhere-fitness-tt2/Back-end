const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../../config/secret')
const {isRegisterValid, isLoginValid} = require('../users/users-service')
const Users = require('../users/users-model')

router.post('/register', (req, res) => {
    const credentials = req.body
    
    if(isRegisterValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 10
        const hash = bcryptjs.hashSync(credentials.password, rounds)
        credentials.password = hash
        Users.add(credentials)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(500).json({message: 'User already exists'});
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric"
        })
    }
})

router.post('/login', (req, res) => {
    const {username, password} = req.body

    if(isLoginValid(req.body)) {
        Users.getBy({username: username})
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = generateToken(user)
                    res.status(200).json({user, token})
                } else {
                    res.status(401).json({message: 'invalid credentials'})
                }
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        })
    }

})

function generateToken(user) {
    const payload = {
        subject: user.userId,
        username: user.username,
        role: user.role
    }
    const options = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, jwtSecret, options)
}


module.exports = router