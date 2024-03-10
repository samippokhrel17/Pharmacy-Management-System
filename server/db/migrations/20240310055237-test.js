"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pharmacy", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,

        type: Sequelize.STRING,
      },

      userType: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["superUser", "user"],
        defaultValue: "user",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pharmacy");
  },
};
