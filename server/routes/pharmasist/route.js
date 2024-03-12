"use strict";
const express = require("express");
const router = express.Router();
const { registerPhamesist, getUserInformation } = require("./index");

(() => {
  //unboarding customers
  router.post("/register", registerPhamesist);
  router.get("/get-user-info/:id", getUserInformation);
  //   router.post("/login", registerPharmesist);

  module.exports = router;
})();
