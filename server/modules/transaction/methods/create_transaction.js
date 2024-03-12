"use strict";
const httpStatus = require("http-status");
const { createTransaction } = require("../sql");

(() => {
  module.exports = async (req, res) => {
    try {
      console.log("Transaction Author Details:", req.body);
      let { transaction_date, total_amount } = req.body;
      if (!transaction_date || !total_amount) {
        return res.status(400).json({ error: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
})();
