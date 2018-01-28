const crypto = require('crypto')


const bytesLength = 16

module.exports = () => crypto.randomBytes(bytesLength).toString('hex')
