//This is the model for setting up mysql table via sequelize
module.exports = function(sequelize, DataTypes) {
  var CrewPlan = sequelize.define("CrewPlan", {
    turbineNumber: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crewName: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    date:DataTypes.DATEONLY	
  });
  return CrewPlan;
};
