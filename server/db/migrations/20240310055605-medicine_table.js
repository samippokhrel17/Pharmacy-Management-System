"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("medicine", {
      medicine_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      medicine_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dose_strength: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      unit_price: {
        allowNull: false,

        type: Sequelize.DECIMAL,
      },
      quantity_available: {
        allowNull: false,

        type: Sequelize.INTEGER,
      },
      expiry_date: {
        allowNull: true,

        type: Sequelize.DATE,
      },
      priority: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medicine");
  },
};
