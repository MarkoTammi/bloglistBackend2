

// BLOGLIST ENVIROMENT DEFINTIONS

// server running enviroment
// fetch .env file
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

// MongoDB for tests.
if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
    MONGODB_URI,
    PORT
}