const express = require("express")
const server = express()
const bugsRouter = require('./api/bugsRouter.js')

server.use(express.json())
server.use('/bugs', bugsRouter)

module.exports = server