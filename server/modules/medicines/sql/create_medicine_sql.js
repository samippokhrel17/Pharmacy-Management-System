"use strict";
const { mysqlConnectionHelper } = require("../../../helpers");
const httpStatus = require("http-status");
const { v4 } = require("uuid");
(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      let insertObject = {
        medicine_name: medicine_name,
        dose_strength: dose_strength,
        unit_price: unit_price,
        quantity_available: quantity_available,
        expiry_date: expiry_date,
      };

      let query = sqlString.format(`INSERT INTO Pharmacy.medicine SET ?`, [
        insertObject,
      ]);

      let result = await executeQuery(query);
      console.log("Database operation result:", result);

      if (result.affectedRows > 0) {
        return res.status(200).send("Medicine Data Saved Successfully");
      }
      return res.status(200).send("Successfully inserted");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
})();
