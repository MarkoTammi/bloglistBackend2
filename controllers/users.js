

// /controllers/users.js

// API for users

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


// Add/create one user to Mongo
usersRouter.post('/', async (request, response) => {

    const body = request.body

    if (body.username.length > 3 && body.password.length > 3) {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User(
            {
                username: body.username,
                name: body.name,
                passwordHash
            }
        )
        const savedUser = await user.save()

        response.json(savedUser)

    } else {
        // if password or username is shorter that <4 chars
        response.status(400).send({ error: 'Too short password or username' })
    }
})


// Return all users with blog info from Mongo
usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        // populate defines which 'blog' fields are included
        .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.json(users.map(blg => blg.toJSON()))
})

// Delete a user from Mongo
usersRouter.delete('/:username', async (request, response) => {
    // Fetch all users for check
    const users = await User.find({})
    if (users.map(u => u.username).includes(request.params.username) === false){
        response.status(400).send({ error: 'Username dont exist' })
    } else {
        await User.deleteOne( { 'username' : request.params.username } )
        response.status(204).send({ 'info' : 'username removed' })
    }
})

module.exports = usersRouter