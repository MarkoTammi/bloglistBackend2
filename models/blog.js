


// Library for MongoDB
const mongoose = require('mongoose')

// Connection to Mongo
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to MONGO')
    })
    .catch((error) => {
        console.log('Error connecting to MONGO >> ', error.message)
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