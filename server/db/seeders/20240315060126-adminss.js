"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("pharmacy_users", [
      {
        user_id: 1,
        firstName: "Samip",
        lastName: "Pokhrel",
        email: "samippokhrel@gmail.com",
        password:
          "$2b$05$LxvsJSgp/exgm5buGLQbIO7KXhFHYCFZ1BdiH0REYwBybEIcWmD2K", //Nepal@12345
        isActive: true,
        isDeleted: false,
        createdDate: new Date().getTime(),
        createdBy: "Admin",
        is_pharmacist: false,
        is_doctor: false,
        is_admin: true,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pharmacy_users", null, {});
  },
};
