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

      let insertObj = {
        medicine_name: req.medicine_name,
        dose_strength: req.dose_strength,
        unit_price: req.unit_price,
        quantity_available: req.quantity_available,
        expiry_date: req.expiry_date
          ? req.expiry_date
          : new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
      };

      let query = await connection.format(
        `
  INSERT IGNORE INTO Pharmacy.medicine
  SET ?,
      priority = (
          SELECT COUNT(*) + 1
          FROM (
              SELECT *
              FROM Pharmacy.medicine
          ) AS temp
          WHERE expiry_date < ?
      )
  `,
        [insertObj, insertObj.expiry_date]
      );

      const [result] = await connection.executeQuery(query);

      if (result && result.warningStatus > 0) {
        return (response = {
          status: httpStatus.BAD_REQUEST,
          message: "Duplicate Data entry!",
        });
      }

      if (result && result.affectedRows > 0) {
        return (response = {
          status: httpStatus.OK,
          message: "Registered successfully!",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
})();

// "use strict";
// const { connection } = require("../../../helpers");
// const httpStatus = require("http-status");

// (() => {
//   module.exports = async (req, res) => {
//     try {
//       let response = {
//         status: httpStatus.BAD_REQUEST,
//         message: "Data Not found",
//       };

//       let insertObj = {
//         medicine_name: req.medicine_name,
//         dose_strength: req.dose_strength,
//         unit_price: req.unit_price,
//         quantity_available: req.quantity_available,
//         expiry_date: req.expiry_date
//           ? req.expiry_date
//           : new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
//       };

//       // let query = await connection.format(
//       //   `
//       //   INSERT IGNORE INTO Pharmacy.medicine set ? `,
//       //   [insertObj]
//       // );

//       let query = await connection.format(
//         `
//    INSERT IGNORE INTO Pharmacy.medicine
// SET ?,
//     priority = (
//         SELECT COUNT(*) + 1
//         FROM (
//             SELECT *
//             FROM Pharmacy.medicine
//         ) AS temp
//         WHERE expiry_date < ? OR (expiry_date = ? AND medicine_id < ?)
//     )

//     `,
//         [
//           insertObj,
//           insertObj.expiry_date,
//           insertObj.expiry_date,
//           insertObj.medicine_id || 0,
//         ]
//       );
//       const [result] = await connection.executeQuery(query);

//       if (result && result.warningStatus > 0) {
//         return (response = {
//           status: httpStatus.BAD_REQUEST,
//           message: "Duplicate Data entry!",
//         });
//       }

//       if (result && result.affectedRows > 0) {
//         return (response = {
//           status: httpStatus.OK,
//           message: "Registered successfully!",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   };
// })();
