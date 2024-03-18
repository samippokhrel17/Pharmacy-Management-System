"use strict";
const httpStatus = require("http-status");
const { getMedicineInformationSqlById } = require("../sql");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      let result = await getMedicineInformationSqlById(req.params);

      if (result && result.status == httpStatus.OK) {
        return res
          .status(200)
          .json({ message: result.message, data: result.data });
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
