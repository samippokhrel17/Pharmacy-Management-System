"use strict";
const httpStatus = require("http-status");
const { createPharmasistSql } = require("../sql");
const bcrypt = require("bcrypt");

(() => {
  module.exports = async (req, res) => {
    try {
      let { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password)
        return res.status(400).json("All fields are required...");

      if (!validator.isStrongPassword(password))
        return res
          .status(400)
          .json(
            "password must be strong password i.e special character, capital,small etc.."
          );

      let emailCheckQuery = sqlString.format(
        `SELECT count(*) AS count FROM Pharmacy.user WHERE email = ?`,
        [email]
      );

      let emailCheckResult = await executeQuery(emailCheckQuery);

      if (emailCheckResult[0].count > 0) {
        return res.status(400).json("Email already exists");
      }

      const salt = await bcrypt.genSalt(1);
      let hashpassword = await bcrypt.hash(password, salt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
})();
