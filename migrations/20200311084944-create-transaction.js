'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'User', key: 'id' },
        allowNull: false,
      },
      location: {
        type:  Sequelize.STRING,
      },
      access_code: {
        type:  Sequelize.INTEGER,
      },
      splash_page: {
        type:  Sequelize.INTEGER,
      },
      mpesa: {
        type: Sequelize.INTEGER,
      },
      autoplay: {
        type: Sequelize.INTEGER,
      },
      comments: {
        type: Sequelize.STRING,
      },
      registration_status: {
        type: Sequelize.STRING,
      },
      customer_first_name: {
        type: Sequelize.STRING,
      },
      customer_last_name: {
        type: Sequelize.STRING,
      },
      customer_phone_number: {
        type: Sequelize.STRING,
      },
      customer_age: {
        type: Sequelize.INTEGER,
      },
      customer_gender: {
        type:  Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};
