const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ userId: req.body.userId });

    if (user)
      return res
        .status(409)
        .send({ message: "User with given user id already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // const { userId, name, email, password, location } = req.body;
    const { location } = req.body;

    //METHOD 1
    // Fetch latitude and longitude based on location
    // const apiKey = "661d9248e3e35465433313hdz23047a";
    // const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(
    //   location
    // )}&api_key=${apiKey}`;
    // const response = await fetch(geocodeUrl);
    // const geocodeData = await response.json();

    // if (!geocodeData || geocodeData.length === 0) {
    //   return res.status(400).send("Invalid location.");
    // }

    // const { lat, lon } = geocodeData[0]; // Assuming first result is correct

    //METHOD 2
    const options = {
      method: "GET",
      url: "https://trueway-geocoding.p.rapidapi.com/Geocode",
      params: {
        address: location,
        language: "en",
      },
      headers: {
        "X-RapidAPI-Key": "5d99692cc9mshc51ddc00f0f8790p193f5fjsn59fc4ffd6b7b",
        "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
      },
    };
    console.log("lat lon");
    const response = await axios.request(options);
    // console.log(response.data.results);
    const lat = response.data.results[0].location.lat;
    const lon = response.data.results[0].location.lng;
    console.log(lat);
    console.log(lon);
    console.log(lat, lon, "lat lon");
    await new User({
      ...req.body,
      password: hashPassword,
      lat,
      lon,
      //   role: "",
    }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
