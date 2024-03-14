"use strict";
const express = require("express");
const router = express.Router();
const { registerDoctor, loginDoctorSql } = require("./index");

(() => {
  //unboarding customers
  router.post("/registerDoctor", registerDoctor);
  router.post("/logindoctor", loginDoctorSql);
  module.exports = router;
})();
