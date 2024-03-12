"use strict";
const express = require("express");
const router = express.Router();
const { registerCustomer } = require("./index");

(() => {
  //unboarding customers
  router.post("/registerCustomer", registerCustomer);

  module.exports = router;
})();
