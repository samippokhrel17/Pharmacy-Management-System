"use strict";
const express = require("express");
const router = express.Router();
const {
  registerCustomer,
  getCustomerInformation,
  updateCustomer,
} = require("./index");
const authenticate = require("./../../modules/middleware/authentiacate");

(() => {
  //unboarding customers
  router.post("/registerCustomer", authenticate, registerCustomer);
  router.get("/get-customer-info/:id", authenticate, getCustomerInformation);
  router.put("/updateCustomer", updateCustomer);

  module.exports = router;
})();
