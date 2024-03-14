"use strict";
const express = require("express");
const router = express.Router();
const {
  registerPhamesist,
  getUserInformation,
  loginUserSql,
} = require("./index");

(() => {
  //unboarding customers
  router.post("/register", registerPhamesist);
  router.get("/get-user-info/:id", getUserInformation);
  router.post("/loginPharmasist", loginUserSql);

  module.exports = router;
})();
