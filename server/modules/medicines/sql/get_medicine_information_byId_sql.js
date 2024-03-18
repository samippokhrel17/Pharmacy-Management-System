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

      let query = await connection.format(
        ` 
        SELECT 
    medicine_id,
    medicine_name,
    dose_strength,
    unit_price,
    quantity_available,
    expiry_date,
    priority

FROM
    Pharmacy.medicine where medicine_id = "${req.id}"
`
      );
      const [result] = await connection.executeQuery(query);

      if (result && result.length > 0) {
        return (response = {
          status: httpStatus.OK,
          message: "Medicine Data fetch succesfully!!",
          data: result[0],
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
})();
