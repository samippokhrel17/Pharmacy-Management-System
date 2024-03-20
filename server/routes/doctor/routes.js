"use strict";
const express = require("express");
const router = express.Router();
const {
  registerDoctor,
  loginDoctorSql,
  referMedicine,
  suggestDoctor,
  getSuggestionPharmacy,
} = require("./index");
const authenticate = require("./../../modules/middleware/authentiacate");

(() => {
  //unboarding customers
  router.post("/registerDoctor", authenticate, registerDoctor);
  router.post("/logindoctor", loginDoctorSql);
  router.post("/refer-medicine", referMedicine);

  //enhance part

  router.post("/suggest-medicine", suggestDoctor);
  router.get("/get-suggestion/:mobileNumber", getSuggestionPharmacy);

  module.exports = router;
})();
