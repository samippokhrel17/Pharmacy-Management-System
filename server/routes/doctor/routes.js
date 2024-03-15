"use strict";
const express = require("express");
const router = express.Router();
const { registerDoctor, loginDoctorSql } = require("./index");
const authenticate = require("./../../modules/middleware/authentiacate");
(() => {
  //unboarding customers
  router.post("/registerDoctor", authenticate, registerDoctor);
  router.post("/logindoctor", loginDoctorSql);
  module.exports = router;
})();
