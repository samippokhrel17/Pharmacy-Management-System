"use strict";
const { mysqlConnectionHelper } = require("../../../helpers");
const httpStatus = require("http-status");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      let insertObject = {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
      };

      let query = sqlString.format(`INSERT INTO Pharmacy.customer SET ?`, [
        insertObject,
      ]);

      let result = await executeQuery(query);
      console.log("Database operation result:", result);

      if (result.affectedRows > 0) {
        return res.status(200).send("Customer Data Saved Successfully");
      }
      return res.status(200).send("Successfully inserted");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
})();
