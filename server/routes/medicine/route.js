"use strict";
const express = require("express");
const router = express.Router();
const { registerMedicines } = require("./index");
const authenticate = require("./../../modules/middleware/authentiacate");

(() => {
  //unboarding customers
  router.post("/registerMedicine", authenticate, registerMedicines);

  module.exports = router;
})();
