const express = require("express");
const { getITMS } = require("../controllers");
const router = express.Router();

router.get("/itsm", getITMS);

module.exports = router;
