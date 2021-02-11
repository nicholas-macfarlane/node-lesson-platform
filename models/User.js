module.exports = (sequelize, Sequelize) => 
{
  const User = sequelize.define('users', 
  {
    email:{
        type:Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
  
    lessons_completed: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },   
  },{
    freezeTableName: true
  });
  return User;
}
