"use strict";
const express = require("express");
const router = express.Router();
const { registerPhamesist } = require("./index");

(() => {
  //unboarding customers
  router.post("/register", registerPhamesist);
  //   router.post("/login", registerPharmesist);

  module.exports = router;
})();
