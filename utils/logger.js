
// Central logger module to display messages to console log

const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = { info, error }