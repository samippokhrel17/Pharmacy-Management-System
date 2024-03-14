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
        is_doctor: 0,
      };

      let query = await connection.format(
        `INSERT IGNORE INTO Pharmacy.pharmacy_users set ? `,
        [insertObj]
      );
      const [result] = await connection.executeQuery(query);

      if (result && result.affectedRows > 0) {
        return (response = {
          status: httpStatus.OK,
          message: "Registered successfully!",
        });
      } else {
        return (response = {
          status: httpStatus.BAD_REQUEST,
          message: "Could Not register Data as email already exists",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" }); // Use 'return' to exit the function
    }
  };
})();
