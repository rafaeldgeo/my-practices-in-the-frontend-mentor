"use strict";

const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");

router.get("/", siteController.index);
router.post("/customerdata", siteController.customerdata);

module.exports = router;
