// const express = require('express')
// const app = express()

const shortid = require('shortid')

shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ^*")
var shortId = shortid.generate()

console.log(shortId)