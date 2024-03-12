"use strict";

const express = require("express");
const router = require("../doctor/routes");
const { registerTransactionDetails } = require("./index");

(() => {
  router.post("registerTransactionDetails", registerTransactionDetails);

  module.exports = router;
})();
