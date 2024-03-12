"use strict";
const { mysqlConnectionHelper } = require("./../../../helpers");
const httpStatus = require("http-status");
const { v4 } = require("uuid");
(() => {
  module.exports = async (req, res) => {
    try {
      // main logic
      let insertObj = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashpassword,
      };

      let query = sqlString.format(`INSERT into Pharmacy.user SET ?`, [
        insertObj,
      ]);

      let [result] = await connection.query(query);

      if (result.affectedRows > 0) return res.status(200).send("success");

      return res.status(200).send("unsuccess");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" }); // Use 'return' to exit the function
    }
  };
})();
