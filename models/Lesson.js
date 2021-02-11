module.exports = (sequelize, Sequelize) => 
{
  const Lesson = sequelize.define('lesson', 
  {
    name: {
      type: Sequelize.STRING
    },
    
    description: {
      type: Sequelize.STRING
    }
  },{
    freezeTableName: true
  });
  return Lesson;
}
