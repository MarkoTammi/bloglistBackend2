


// DB model for blog

// Library for MongoDB
const mongoose = require('mongoose')

// Allow use of FindAndModify
mongoose.set('useFindAndModify', false)

// Document schema for the blog
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Blog', blogSchema)