"use strict";

const { DECIMAL } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaction", {
      transaction_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customer_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      transaction_date: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      total_amount: {
        allowNull: true,
        type: Sequelize.DECIMAL,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transaction");
  },
};
