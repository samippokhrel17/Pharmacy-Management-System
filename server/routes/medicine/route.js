"use strict";
const express = require("express");
const router = express.Router();
const { registerMedicines, getMedicineInformation } = require("./index");
const authenticate = require("./../../modules/middleware/authentiacate");

(() => {
  //unboarding customers
  router.post("/registerMedicine", authenticate, registerMedicines);
  router.get("/get-medicine-info", getMedicineInformation);

  module.exports = router;
})();
