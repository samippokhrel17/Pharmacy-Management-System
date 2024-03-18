"use strict";
const express = require("express");
const router = express.Router();
const {
  registerMedicines,
  getMedicineInformation,
  getMedicineInformationSqlById,
} = require("./index");
const authenticate = require("./../../modules/middleware/authentiacate");

(() => {
  //unboarding customers
  router.post("/registerMedicine", authenticate, registerMedicines);
  router.get("/get-medicine-info", getMedicineInformation);
  router.get("/get-medicine-info/:id", getMedicineInformationSqlById);

  module.exports = router;
})();
