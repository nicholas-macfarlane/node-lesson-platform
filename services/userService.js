const db = require('../config/db.js');
const User = db.users;
const SequelizeUniqueConstraintError = db.Sequelize.SequelizeUniqueConstraintError;
exports.create = async function(user) {
    try {
        const newUser = await User.create({
        email: user.email,
        lessons_completed: [0]
        });
    } catch(error) {
        if (error.name === "SequelizeUniqueConstraintError") {
           //user already exists, continue with current data
           return user.id;
        }
        console.log('Created new user: ' + newUser.email);
        return newUser.id;
        
    }
        
};

exports.findAll = async function() {
    const users = await User.findAll();
    return users;
};

exports.findById = async function(userId) {
    const user = User.findByPk(userId)
    return user;
};

exports.findByEmail = async function(userEmail) {
    const user = await User.findOne({
        where: {email: userEmail}
    });
    return user;
};