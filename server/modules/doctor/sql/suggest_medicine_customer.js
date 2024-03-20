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

      let query = await connection.format(
        `SELECT 
    m.medicine_id,
    m.medicine_name,
    p.mobile_number,
    m.expiry_date,
    p.quantity_given
FROM
    Pharmacy.doctor_suggestions AS p
        INNER JOIN
    Pharmacy.medicine AS m ON m.medicine_name= p.medicine_name
    where p.mobile_number = "${req.mobileNumber}"; `
      );
      let [listedItems] = await connection.executeQuery(query);
      if (listedItems && listedItems.length <= 0) {
        return (response = {
          status: httpStatus.BAD_GATEWAY,
          message: "doctor suggestion not found for this mobile number",
        });
      } else if (listedItems && listedItems.length > 0) {
        let toReductId = await connection.format(
          `SELECT 
    m.medicine_id,
    m.medicine_name,
    p.mobile_number,
    m.expiry_date,
    p.quantity_given
FROM
    Pharmacy.doctor_suggestions AS p
        INNER JOIN
    Pharmacy.medicine AS m ON m.medicine_name= p.medicine_name
    where m.medicine_id = "${req.medcineId}"`
        );

        let [toReductIdResult] = await connection.executeQuery(toReductId);

        if (toReductIdResult && toReductIdResult.length > 0) {
          let suggQuery = `SELECT quantity_available,medicine_name FROM Pharmacy.medicine where medicine_id = "${req.medcineId}"`;
          let [updateSuggestedItems] = await connection.executeQuery(suggQuery);

          if (updateSuggestedItems && updateSuggestedItems.length > 0) {
            let resultMain =
              updateSuggestedItems[0].quantity_available -
              toReductIdResult[0].quantity_given;

            let updateLast = `update Pharmacy.medicine set quantity_available = "${resultMain}" where medicine_id =${req.medcineId} `;

            let [updateResult] = await connection.executeQuery(updateLast);

            if (updateResult && updateResult.affectedRows > 0) {
              return (response = {
                status: httpStatus.OK,
                message: "successfully sold to specific customer!!!",
              });
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" }); // Use 'return' to exit the function
    }
  };
})();
