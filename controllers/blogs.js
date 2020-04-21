

// /controllers/blogs.js

// Blog API router file


const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

// Function to fetch token from http request header authorization
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}


// Get all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 } )

    response.json(blogs.map(blog => blog.toJSON()))
})

// Add one blog
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    //const user = await User.findOne({ username: 'marko@test.fi' })

    // Blog's title and URL are manadotory parameters
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).end()
    }

    const blog = new Blog(
        {
            title: body.title,
            author: body.author,
            url: body.url,
            // If "likes" is not defined its set to 0
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id
        })

    const savedBlog = await blog.save()

    // Save blog info also to user object
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())

})

// Update blog based on id
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog =
        {
            title: body.title,
            author: body.author,
            url: body.url,
            // If "likes" is not defined its set to 0
            likes: body.likes === undefined ? 0 : body.likes
        }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})


// Delete one blog based on id
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    // Status 204 include both blog remove and requested blog not exist
    response.status(204).end()
})



module.exports = blogsRouter