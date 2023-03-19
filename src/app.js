const express = require('express')
const app = express()
var cors = require('cors')

// please disable the following line if you don't want to use cors
app.use(cors())

// to read the body of the request
app.use(express.json())


const index = require('./routes/index');
app.use(index);

module.exports = app;