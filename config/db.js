const Sequelize = require('sequelize');
const dialect = process.env.DB_DIALECT;
const user = process.env.DB_USER;
const password = process.env.DB_USER_PASS
const server = process.env.DB_ADDRESS;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;

const sequelize = new Sequelize(
    `${dialect}://${user}:${password}@${server}:${port}/${name}`
);

sequelize.authenticate()
.then(() => console.log('Database connected'))
.catch(err => console.log('Error: ' + err));

const db = {};
db.users = require('../models/User.js')(sequelize, Sequelize);
db.lessons = require('../models/Lesson.js')(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;