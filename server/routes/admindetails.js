const router = require("express").Router();
const { Selection } = require("../models/selection");
const Joi = require("joi");

// Fetch user details for admin endpoint
router.get("/", async (req, res) => {
  try {
    const { comeToOffice, periodOfDay } = req.query;
    const selections = await Selection.find({
      comeToOffice,
      periodOfDay,
    }).populate("userId", "name lat lon");
    // .exec((err, posts) => {
    //   if (err) {
    //     console.error("Error retrieving posts:", err);
    //     return;
    //   }
    //   // selections = posts;
    //   console.log("All posts:", posts);
    // });
    console.log(selections, "selections");
    res.status(200).send(selections);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user details.");
  }
});

module.exports = router;
