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
        quanity_sold: quanity_sold,
        total_amount: total_amount,
      };

      let query = sqlString.format(
        `INSERT INTO Pharmacy.transaction_details SET ?`,
        [insertObject]
      );

      let result = await executeQuery(query);
      console.log("Database operation result:", result);

      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send("transaction_details Data Saved Successfully");
      }
      return res.status(200).send("Successfully inserted");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
})();
