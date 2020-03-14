'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Transaction, {
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
      foreignKey: {
        name: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  };

  return User;
};
