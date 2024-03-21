"use strict";
const httpStatus = require("http-status");
const { createCustomer } = require("../sql");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      const { firstName, lastName, contact } = req.body;

      if (!(firstName || lastName || contact)) {
        return res.status(404).json({ message: "Fields cannot be empty!" });
      }
      //if other logics like jwt token
      // Calling the createCustomer function with the request body
      let result = await createCustomer(req.body);

      // Handling different outcomes based on the result status
      if (result && result.status == httpStatus.OK) {
        return res.status(200).json({ message: result.message });
      }

      if (result && result.status == httpStatus.BAD_REQUEST) {
        return res.status(400).json({ message: "Bad request" });
      }

      return res.status(400).json({ error: response.message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
})();
