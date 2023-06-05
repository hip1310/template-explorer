const HomeController = require("../controllers/home");
const express = require("express");
const router = express.Router();

router.get("/", [HomeController.get]);

module.exports = router;
