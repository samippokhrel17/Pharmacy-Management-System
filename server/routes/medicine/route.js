"use strict";
const express = require("express");
const router = express.Router();
const { registerMedicines } = require("./index");

(() => {
  //unboarding customers
  router.post("/registerMedicine", registerMedicines);

  module.exports = router;
})();
