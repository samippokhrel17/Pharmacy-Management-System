"use strict";
const { mysqlConnectionHelper } = require("./../../../helpers");
const httpStatus = require("http-status");
const { v4 } = require("uuid");
(() => {
  module.exports = async (call, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      let insertObj = {
        uuid: v4(),
        first_name: call.firstName,
        last_name: call.lastName,
      };

      let query = await mysqlConnectionHelper.format(
        `INSERT IGNORE INTO sagar_test.balance_humanity_users set ? `,
        [insertObj]
      );
      const [result] = await mysqlConnectionHelper.query(query);

      if (result && result.warningStatus > 0) {
        return (response = {
          status: httpStatus.BAD_REQUEST,
          message: "Duplicate Data entry!",
        });
      }

      if (result && result.affectedRows > 0) {
        return (response = {
          status: httpStatus.OK,
          message: "Registered successfully!",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" }); // Use 'return' to exit the function
    }
  };
})();
