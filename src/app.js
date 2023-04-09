const express = require('express')
const app = express()
var cors = require('cors')

const db = require('./config/db.config')
// please disable the following line if you don't want to use cors
app.use(cors())

// to read the body of the request
app.use(express.json())


const index = require('./routes/index');
app.use(index);

// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync with { force: false }');
});

module.exports = app;