"use strict";
const httpStatus = require("http-status");
const { createCustomer } = require("../sql");

(() => {
  module.exports = async (req, res) => {
    try {
      console.log("Customer Author Details:", req.body);
      let { firstName, lastName, contact } = req.body;
      if (!firstName || !lastName || !contact) {
        return res.status(400).json({ error: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
})();
