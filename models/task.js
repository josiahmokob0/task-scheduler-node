'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    assigned: DataTypes.DATE,
    in_progress: DataTypes.DATE,
    completed: DataTypes.DATE,
    deffered: DataTypes.DATE,
    status: DataTypes.STRING,
    transaction_id: DataTypes.INTEGER,
  }, {});

  Task.associate = function(models) {
   Task.belongsTo(models.Transaction, {
      foreignKey: {
        name: 'transaction_id',
        allowNull: 'false'
      }
    });
  };
  return Task;
};
