
// Blog API router file


const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

// Add one blog
blogsRouter.post('/', async (request, response) => {
    const body = request.body

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
            likes: body.likes === undefined ? 0 : body.likes
        })

    const savedBlog = await blog.save()
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