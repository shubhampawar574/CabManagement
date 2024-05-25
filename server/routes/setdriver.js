// routes/driver.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" });
    res.json(drivers);
    console.log("drivers", drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
