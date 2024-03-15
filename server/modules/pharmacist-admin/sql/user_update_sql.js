"use strict";
const { connection } = require("../../../helpers");
const httpStatus = require("http-status");

module.exports = async (userId, isDoctor, isAdmin) => {
  try {
    let response = {
      status: httpStatus.BAD_REQUEST,
      message: "Data not found",
    };

    let query = `UPDATE Pharmacy.pharmacy_users 
                 SET is_doctor = ?, is_admin = ? 
                 WHERE user_id = ?`;

    const [result] = await connection.executeQuery(query, [
      isDoctor,
      isAdmin,
      userId,
    ]);

    if (result && result.affectedRows > 0) {
      return { status: httpStatus.OK, message: "User updated successfully" };
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
