
// START FILE

const app = require('./App')

// include Node internal web-server module
const http = require('http')


// Configutation module
const config = require('./utils/config')

// Centralized logging module
const logger = require('./utils/logger')


const server = http.createServer(app)


/* // middleware for logging http request to console
NOT USED instead /utils/middleware.js-requestLogger
const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method - :url - :status - :body - :date[clf]')) */



// Timestamp extension
const timestamp = require('time-stamp')


server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`, timestamp('YYYY/MM/DD HH:mm:ss'))
})

