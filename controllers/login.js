
// /controllers/login.js

// API controller for login

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// API for login
loginRouter.post('/', async (request, response) => {
    const body = request.body

    // Find username from Mongo
    const user = await User.findOne({ username: body.username })

    // Username exist in Mongo and password is correct
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const userForToken =
        {
            username: user.username,
            id: user._id,
        }

    // Create token based on username, userId and secret key
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send(
            {
                token,
                username: user.username,
                name: user.name
            }
        )
})

module.exports = loginRouter


