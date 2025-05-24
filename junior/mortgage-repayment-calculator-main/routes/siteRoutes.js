const express = require("express");
const router = express.Router(); // group all the routes defined
const siteController = require("../controllers/siteController");

// define the urls and which controllers will response
router.get("/", siteController.index); // home

module.exports = router; // export the routes variable that contains all defined routes