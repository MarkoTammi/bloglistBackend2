
// Blog API router file


const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

// Get all blogs
blogsRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => { response.json(blogs) })
        .catch(error => next(error))
})

// Add one blog
blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => { response.status(201).json(result) })
        .catch(error => next(error))
})

module.exports = blogsRouter