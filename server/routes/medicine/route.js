"use strict";
const express = require("express");
const router = express.Router();
const { registerPharmesist } = require("./index");

(() => {
  //unboarding customers
  router.post("/create", registerPharmesist);

  module.exports = router;
})();
