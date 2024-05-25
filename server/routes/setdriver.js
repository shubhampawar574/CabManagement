// routes/driver.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  try {
    console.log("fetch drivers");
    const drivers = await User.find({ role: "driver" });
    // const drivers = await User.find({ role: "driver" }, async (err, docs) => {
    //   // console.log("drivers", drivers);
    //   await res.status(200).json(docs);
    // });
    //   const drivers = await User.findOne({}, (err, docs) => {
    //     console.log("drivers", drivers);
    //     res.status(200).json(docs);
    //   });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
