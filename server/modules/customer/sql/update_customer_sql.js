// "use strict";
// const { connection } = require("../../../helpers");
// const httpStatus = require("http-status");

// module.exports = async (userId, medicine, quantityGiven) => {
//   try {
//     let response = {
//       status: httpStatus.BAD_REQUEST,
//       message: "Data not found",
//     };

//     // Fetch all data from the medicine table
//     const queryMedicine = `SELECT medicine_name, dose_strength,expiry_date FROM medicine where medicine_id=${medicine}`;
//     const [medicines] = await connection.executeQuery(queryMedicine);

//     if (medicines.length < 0) {
//       return {
//         status: httpStatus.BAD_REQUEST,
//         message: "Could not find medicine",
//       };
//     }
//     // Convert fetched data into appropriate format (e.g., JSON string)
//     const medicineData = JSON.stringify(medicines);

//     let query = `UPDATE Pharmacy.customer
//                  SET approved_medicine = ?,
//                  quantity_given = ?
//                  WHERE customer_id = ?`;

//     const [result] = await connection.executeQuery(query, [
//       medicineData,
//       quantityGiven,
//       userId,
//     ]);

//     if (result && result.affectedRows > 0) {
//       return {
//         status: httpStatus.OK,
//         message: "Customer Medicine Approved successfully",
//       };
//     } else {
//       return {
//         status: httpStatus.BAD_REQUEST,
//         message: "Could not update user",
//       };
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       message: "Internal Server Error",
//     };
//   }
// };

"use strict";
const { connection } = require("../../../helpers");
const httpStatus = require("http-status");

module.exports = async (userId, medicineName, quantityGiven) => {
  try {
    let response = {
      status: httpStatus.BAD_REQUEST,
      message: "Data not found",
    };

    // Fetch medicine data from the medicine table
    const queryMedicine = `
      SELECT medicine_id, medicine_name, dose_strength, expiry_date 
      FROM medicine 
      WHERE medicine_name = '${medicineName}'
      ORDER BY expiry_date ASC
      LIMIT 1
    `;
    const [medicines] = await connection.executeQuery(queryMedicine);

    if (medicines.length === 0) {
      return {
        status: httpStatus.BAD_REQUEST,
        message: "Could not find medicine",
      };
    }

    const medicineData = JSON.stringify(medicines[0]);

    let query = `UPDATE Pharmacy.customer 
                 SET approved_medicine = ?,
                 quantity_given = ?
                 WHERE customer_id = ?`;

    const [result] = await connection.executeQuery(query, [
      medicineData,
      quantityGiven,
      userId,
    ]);

    if (result && result.affectedRows > 0) {
      return {
        status: httpStatus.OK,
        message: "Customer Medicine Approved successfully",
      };
    } else {
      return {
        status: httpStatus.BAD_REQUEST,
        message: "Could not update user",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
    };
  }
};
