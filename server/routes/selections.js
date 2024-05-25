const router = require("express").Router();
const { Selection } = require("../models/selection");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Save user selections endpoint
router.post("/", async (req, res) => {
  try {
    // Extract token from request header
    console.log(req.headers);
    const token = req.headers.authorization.substring(7);
    const tokenValue = JSON.parse(token).tokdata;
    console.log(tokenValue, "token");
    // Verify token
    const decoded = jwt.verify(tokenValue, process.env.JWTPRIVATEKEY);
    console.log("decoded", decoded);
    // const userId = decoded.userId; // Extract user ID from decoded token
    // console.log(userId);
    const { comeToOffice, periodOfDay } = req.body;

    const userId = mongoose.Types.ObjectId(decoded);
    // Check if a selection already exists for the user
    let selection = await Selection.findOne({ userId });
    console.log("after findone");
    if (selection) {
      // Update the existing selection
      selection.comeToOffice = comeToOffice;
      selection.periodOfDay = periodOfDay;
      console.log("user updated", comeToOffice, periodOfDay);
      await selection.save();
      // await selection.save();
      res.status(201).send("Existing user selections saved successfully.");
    } else {
      const selection = new Selection({
        userId: mongoose.Types.ObjectId(decoded),
        comeToOffice,
        periodOfDay,
      });
      console.log(selection);
      await selection.save();
      res.status(201).send("New user selections saved successfully.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving user selections.");
  }
});

module.exports = router;
