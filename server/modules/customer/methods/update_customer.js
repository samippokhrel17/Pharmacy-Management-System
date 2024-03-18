"use strict";
const httpStatus = require("http-status");
const { updateCustomerInformationSql } = require("../sql");

(() => {
  module.exports = async (req, res) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data not found",
      };

      const { userId, medicine_approved } = req.body;

      if (!userId || !medicine_approved) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      let result = await updateCustomerInformationSql(
        userId,
        medicine_approved
      );

      if (result && result.status === httpStatus.OK) {
        return res.status(httpStatus.OK).json({ message: result.message });
      } else if (result && result.status === httpStatus.BAD_REQUEST) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: result.message });
      }

      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: response.message });
    } catch (error) {
      console.error(error);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  };
})();
