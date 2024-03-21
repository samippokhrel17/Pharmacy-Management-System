"use strict";
const { connection } = require("../../../helpers");
const httpStatus = require("http-status");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      let insertObj = {
        firstName: req.firstName,
        lastName: req.lastName,
        contact: req.contact,
      };

      let query = await connection.format(
        `INSERT IGNORE INTO Pharmacy.customer set ? `,
        [insertObj]
      );
      const [result] = await connection.executeQuery(query);

      if (result && result.warningStatus > 0) {
        return (response = {
          status: httpStatus.BAD_REQUEST,
          message: "Duplicate Data entry!",
        });
      }

      if (result && result.affectedRows > 0) {
        return (response = {
          status: httpStatus.OK,
          message: " Customer Registered successfully!",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" }); // Use 'return' to exit the function
    }
  };
})();
