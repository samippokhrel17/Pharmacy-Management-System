"use strict";
const { connection } = require("../../../helpers");
const httpStatus = require("http-status");
const hashHelper = require("./../helper/hashHelper");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };
      // Looping through each medicine name in the request
      for (let i = 0; i < req.medicineName.length; i++) {
        let insertObj = {
          medicine_name: req.medicineName[i],
          mobile_number: req.mobileNumber,
          doctor_id: req.doctorId,
          approve_date: new Date().getTime(),
          quantity_given: req.quantityGiven,
        };

        let query = await connection.format(
          `INSERT IGNORE INTO Pharmacy.doctor_suggestions set ? `,
          [insertObj]
        );
        await connection.executeQuery(query);
      }

      return (response = {
        status: httpStatus.OK,
        message: "suggestion noted sucessfully!!!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" }); // Use 'return' to exit the function
    }
  };
})();
