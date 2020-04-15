
// Central logger module to display messages to console log

const info = (...params) => {
    if (process.env.NODE_ENV !== 'test'){
        console.log(...params)
    }
}

const error = (...params) => {
    console.error(...params)
}

module.exports = { info, error }