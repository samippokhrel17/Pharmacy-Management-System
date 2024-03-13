"use strict";
const httpStatus = require("http-status");
const { createMedcine } = require("../sql");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      const {
        medicine_name,
        dose_strength,
        unit_price,
        quantity_available,
        expiry_date,
      } = req.body;

      if (
        !(
          medicine_name ||
          dose_strength ||
          unit_price ||
          quantity_available ||
          expiry_date
        )
      ) {
        return res.status(404).json({ message: "Fields cannot be empty!" });
      }
      //if other logics like jwt token

      let result = await createMedcine(req.body);

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
