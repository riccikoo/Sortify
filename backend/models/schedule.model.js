// models/schedule.model.js
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    scheduleAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    }
  });

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Schedule;
};
