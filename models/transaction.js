'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    location: DataTypes.STRING,
    access_code: DataTypes.INTEGER,
    splash_page: DataTypes.INTEGER,
    mpesa: DataTypes.INTEGER,
    autoplay: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    registration_status: DataTypes.STRING,
    customer_first_name: DataTypes.STRING,
    customer_last_name: DataTypes.STRING,
    customer_phone_number: DataTypes.STRING,
    customer_age: DataTypes.INTEGER,
    customer_gender: DataTypes.STRING,
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};
