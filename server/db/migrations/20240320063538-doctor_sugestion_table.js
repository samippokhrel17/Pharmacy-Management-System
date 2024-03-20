"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("doctor_suggestions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      medicine_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mobile_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      approve_date: {
        allowNull: true,
        type: Sequelize.BIGINT,
      },
      doctor_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      quantity_given: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("doctor_suggestions");
  },
};
