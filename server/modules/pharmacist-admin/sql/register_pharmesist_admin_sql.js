"use strict";
const { connection } = require("../../../helpers");
const httpStatus = require("http-status");
const hashHelper = require("./../helpers/hashHelper");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      // salt generate

      let generateSalt = await hashHelper.generateSalt();

      let hashPassword = await hashHelper.hashPassword(
        req.password,
        generateSalt
      );
      let insertObj = {
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        password: hashPassword,
        isActive: true,
        isDeleted: false,
        createdDate: new Date().getTime(),
        createdBy: "samip",
        is_pharmacist: 0,
      };

      let query = await connection.format(
        `INSERT IGNORE INTO Pharmacy.pharmacy_users set ? `,
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
          message: "Registered successfully!",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" }); // Use 'return' to exit the function
    }
  };
})();
