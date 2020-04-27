

// /controllers/blogs.js

// Blog API router file


const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

/* // Function to fetch token from http request header authorization
Moved to middleware.tokenExtractor
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
} */


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

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' }).end()
    }

    const user = await User.findById(decodedToken.id)
    //const user = await User.findOne({ username: 'marko@test.fi' })

    // Blog's title and URL are manadotory parameters
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).json({ error: 'Title and URL are manadotory' }).end()
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
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' }).end()
    }

    console.log('request.params.id "request blog"', request.params.id)
    const blog = await Blog.findById(request.params.id)
    console.log('blog.user "created by"', blog.user)
    console.log('decodedToken.id "delete by"', decodedToken.id)

    // Only blog creator has right to delete blog
    if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        // Status 204 include both blog remove and requested blog not exist
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'Unauthorized user' }).end()
    }
})



module.exports = blogsRouter