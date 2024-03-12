"use strict";
const httpStatus = require("http-status");
const { createDoctor } = require("../sql");

(() => {
  module.exports = async (req, res) => {
    try {
      console.log("Doctor Author Details:", req.body);
      let { firstName, lastName, email, password, specilization, contact } =
        req.body;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !specilization ||
        !contact
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
})();
