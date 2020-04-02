

// server running enviroment
// fetch .env file
require('dotenv').config()

// include Node internal web-server module
const http = require('http')

// web framework for Node.js
const express = require('express')
const app = express()

// Centralized logging module
const logger = require('./utils/logger')

// body-parser is express library - access to data send by post-method
const bodyParser = require('body-parser')
app.use(bodyParser.json())


// middleware for logging http request to console
const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method - :url - :status - :body - :date[clf]'))


// Node mw cors - allow access from all origins
const cors = require('cors')
app.use(cors())

// Timestamp extension
const timestamp = require('time-stamp')

// MongoDB definitions
const Blog = require('./models/blog')


app.get('/', (request, response) => {
    response.send('<h3>Use url /api/blogs</h3>')
})

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`, timestamp('YYYY/MM/DD HH:mm:ss'))
})

