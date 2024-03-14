"use strict";
const { connection } = require("../../../helpers");
const httpStatus = require("http-status");
const hashHelper = require("./../helpers/hashHelper");

module.exports = async (email) => {
  try {
    const query = `SELECT * FROM Pharmacy.pharmacy_users WHERE email = ?`;
    const [result] = await connection.executeQuery(query, [email]);
    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving user data");
  }
};
