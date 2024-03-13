"use strict";
const express = require("express");
const router = express.Router();

//unboarding pharmastesr
const pharmacy = require("./pharmasist/route");
router.use("/pharmacist", pharmacy);

const medicine = require("./medicine/route");
router.use("/medicine", medicine);

const customer = require("./customer/routes");
router.use("/customer", customer);

const doctor = require("./doctor/routes");
router.use("/doctor", doctor);

const transaction = require("./transaction/routes");
router.use("/transaction", transaction);

// const transactionDetails = require("./transactionDetails/routes");
// router.use("/transactionDetails", transactionDetails);

// add here...

module.exports = router;
