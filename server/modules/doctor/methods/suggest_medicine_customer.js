"use strict";
const httpStatus = require("http-status");
const { suggestMedicine } = require("../sql");
const mysqlHelper = require("./../../../helpers/database_helper");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      const { medicineName, mobileNumber, doctorId, quantityGiven } = req.body;

      if (!medicineName || !mobileNumber || !doctorId || !quantityGiven) {
        return res
          .status(400)
          .json({ message: "Required fields cannot be empty!" });
      }

      let validateQuery = await mysqlHelper.format(
        `select customer_id from Pharmacy.customer where Contact= ${mobileNumber}`
      );

      let [resultValidate] = await mysqlHelper.executeQuery(validateQuery);

      if (resultValidate && resultValidate.length <= 0) {
        return res.status(400).json({
          message:
            "User is not registered to our system!! please register first!!",
        });
      }

      let result = await suggestMedicine(req.body);

      if (result && result.status == httpStatus.OK) {
        return res.status(200).json({ message: result.message });
      }

      if (result && result.status == httpStatus.BAD_REQUEST) {
        return res.status(400).json({ message: "Bad request" });
      }

      return res.status(400).json({ error: response.message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
})();
