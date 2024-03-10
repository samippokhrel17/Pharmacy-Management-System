"use strict";
const express = require("express");
const router = express.Router();

//unboarding pharmastesr
const pharmacy = require("./pharmasist/route");
router.use("/pharmacist", pharmacy);

// const medicine = require("./medicine/route");
// router.use("/medicine", medicine);

// add here...

module.exports = router;
