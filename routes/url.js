const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl, handleRedirectShortUrl, handleVisitClicks } = require("../controllers/user");

router.post("/", handleGenerateNewShortUrl); //->  /url/ (path)
router.get("/:shortid", handleRedirectShortUrl); // -> /url/:shortid
router.get("/analytics/:shortid", handleVisitClicks); // -> /url/analytics/:shortid

module.exports = router;