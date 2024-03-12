"use strict";
const httpStatus = require("http-status");
const { createMedcine } = require("../sql");

(() => {
  module.exports = async (req, res) => {
    try {
      console.log("Medicine Author Details:", req.body);
      let {
        medicine_name,
        dose_strength,
        unit_price,
        quantity_available,
        expiry_date,
      } = req.body;
      if (
        !medicine_name ||
        !dose_strength ||
        !unit_price ||
        !quantity_available ||
        !expiry_date
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
})();

// const medicine = async (req, res) => {
//   try {
//     console.log("Medicine Author Details:", req.body);
//     let {
//       medicine_name,
//       dose_strength,
//       unit_price,
//       quantity_available,
//       expiry_date,
//     } = req.body;
//     if (
//       !medicine_name ||
//       !dose_strength ||
//       !unit_price ||
//       !quantity_available ||
//       !expiry_date
//     ) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// };

// module.exports = { medicine };
