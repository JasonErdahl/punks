//This is the model for setting up mysql table via sequelize
module.exports = function(sequelize, DataTypes) {
  var CrewPlan = sequelize.define("CrewPlan", {
    turbineNumber:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    crewName:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    date: DataTypes.DATEONLY
  });
  return CrewPlan;
};
