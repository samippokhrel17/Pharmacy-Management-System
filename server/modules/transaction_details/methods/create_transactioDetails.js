"use strict";
const httpStatus = require("http-status");
const { createTransactionDetails } = require("../sql");

(() => {
  module.exports = async (req, res) => {
    try {
      console.log(" Tranjaction_Details Details:", req.body);
      let { quanity_sold, total_amount } = req.body;
      if (!quanity_sold || !total_amount) {
        return res.status(400).json({ error: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
})();
