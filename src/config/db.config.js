const env = require('./env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Todo = require('../models/todo.model.js')(sequelize, Sequelize);

sequelize
  .sync({
    logging: console.log,
  })
  .then(() =>{
      // seeding here
    // db.Customer.create({
    //     firstname: 'testing firstname',
    //     lastname: 'testing lastname'
    // })
  })
  .then(() => console.log('connection established successfully'))
  .catch((err) => console.log('Unable to connect to database ', err));

module.exports = db;
