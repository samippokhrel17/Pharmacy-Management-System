"use strict";
const express = require("express");
const router = express.Router();
const { registerCustomer, getCustomerInformation } = require("./index");

(() => {
  //unboarding customers
  router.post("/registerCustomer", registerCustomer);
  router.get("/get-customer-info/:id", getCustomerInformation);

  module.exports = router;
})();
