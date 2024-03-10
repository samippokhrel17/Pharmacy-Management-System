"use strict";

const { DECIMAL } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("medicine", {
      transaction_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      costomer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Customers", // referenced table name
          key: "id", // Primary key in the referenced table
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      transaction_date: {
        allowNull: false,

        type: Sequelize.DATE,
      },

      total_amount: {
        allowNull: true,
        type: Sequelize.DECIMAL,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medicine");
  },
};
