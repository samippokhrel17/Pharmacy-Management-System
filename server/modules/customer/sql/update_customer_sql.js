"use strict";
const { connection } = require("../../../helpers");
const httpStatus = require("http-status");

module.exports = async (userId, medicine_approved) => {
  try {
    let response = {
      status: httpStatus.BAD_REQUEST,
      message: "Data not found",
    };

    let query = `UPDATE Pharmacy.customer 
                 SET medicine_approved = ?
                 WHERE customer_id = ?`;

    const [result] = await connection.executeQuery(query, [
      medicine_approved,
      userId,
    ]);

    if (result && result.affectedRows > 0) {
      return {
        status: httpStatus.OK,
        message: "Customer Medicine Approved  successfully",
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
