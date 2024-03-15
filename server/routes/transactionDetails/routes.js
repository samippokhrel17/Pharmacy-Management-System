"use strict";

const express = require("express");
const router = require("../doctor/routes");
const { registerTransactionDetails } = require("./index");
const authenticate = require("./../../modules/middleware/authentiacate");

(() => {
  router.post(
    "registerTransactionDetails",
    authenticate,
    registerTransactionDetails
  );

  module.exports = router;
})();
