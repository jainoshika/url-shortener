const express = require("express");
const router = express.Router();
const URLModel = require("../models/user")
router.get("/", async (req, res) => {
    const allUrls = await URLModel.find({});
    return res.render("home", {urls: allUrls});
})
module.exports = router;