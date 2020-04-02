


// Library for MongoDB
const mongoose = require('mongoose')

// Fetch configuration definitions
const config = require('../utils/config')
const logger = require('../utils/logger')

// Connection to Mongo
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        logger.info('Connected to MONGO')
    })
    .catch((error) => {
        logger.error('Error connecting to MONGO >> ', error.message)
    })

// Document schema for the blog
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)


module.exports = mongoose.model('Blog', blogSchema)