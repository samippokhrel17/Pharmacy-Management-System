"use strict";

const { DECIMAL } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaction_details", {
      transaction_details_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transaction_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      medicine_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      quanity_sold: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      total_amount: {
        allowNull: true,
        type: Sequelize.DECIMAL,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transaction_details");
  },
};
