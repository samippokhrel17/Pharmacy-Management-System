"use strict";
const httpStatus = require("http-status");
const { createPharmasistSql } = require("../sql");
const bcrypt = require("bcrypt");

(() => {
  module.exports = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json("Email and password are required");

      let emailCheckQuery = sqlString.format(
        `SELECT * FROM Pharmacy.user WHERE email = ?`,
        [email]
      );

      let user = await executeQuery(emailCheckQuery);

      if (user.length === 0) {
        return res.status(404).json("User not found");
      }

      const hashedPassword = user[0].password;

      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatch) {
        return res.status(401).json("Invalid password");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
})();
