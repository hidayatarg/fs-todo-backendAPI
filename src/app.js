const express = require('express')
const app = express()

// to read the body of the request
app.use(express.json())


const index = require('./routes/index');
app.use(index);

module.exports = app;