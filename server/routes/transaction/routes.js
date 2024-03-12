"use strict";
const express = require("express");
const router = express.Router();
const { registerTransaction } = require("./index");

(() => {
  //unboarding customers
  router.post("/registerTransaction", registerTransaction);

  module.exports = router;
})();
