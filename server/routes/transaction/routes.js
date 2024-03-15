"use strict";
const express = require("express");
const router = express.Router();
const { registerTransaction } = require("./index");
const authenticate = require("./../../modules/middleware/authentiacate");

(() => {
  //unboarding customers
  router.post("/registerTransaction", authenticate, registerTransaction);

  module.exports = router;
})();
