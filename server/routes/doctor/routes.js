"use strict";
const express = require("express");
const router = express.Router();
const { registerDoctor } = require("./index");

(() => {
  //unboarding customers
  router.post("/registerDoctor", registerDoctor);

  module.exports = router;
})();
