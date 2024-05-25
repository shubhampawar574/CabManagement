const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Hardcoded admin credentials
const ADMIN_USERID = "admin";
const ADMIN_PASSWORD = "Sapadmin_1";

// Hardcoded food admin credentials
const FOOD_ADMIN_USERID = "foodadmin";
const FOOD_ADMIN_PASSWORD = "Foodadmin_1";

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ userId: req.body.userId });
    // console.log(user, "iyoiuy");
    if (!user)
      return res.status(401).send({ message: "Invalid userid or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    const validateadminPassword = await bcrypt.compare(
      ADMIN_PASSWORD,
      user.password
    );
    const validatefoodadminPassword = await bcrypt.compare(
      FOOD_ADMIN_PASSWORD,
      user.password
    );
    if (validPassword) {
      if (user.userId === FOOD_ADMIN_USERID && validatefoodadminPassword) {
        const token = user.generateAuthToken();
        console.log("Token", token);
        res.status(200).send({
          tokdata: token,
          message: "Food admin logged in successfully",
          isAdmin: false,
          isUser: false,
          isFoodAdmin: true,
        });
        console.log("Food Admin auth completed");
      } else if (user.userId === ADMIN_USERID && validateadminPassword) {
        // res.status(200).json({ isAdmin: true });

        const token = user.generateAuthToken();
        console.log("Token", token);
        res.status(200).send({
          tokdata: token,
          message: "admin logged in successfully",
          isAdmin: true,
          isUser: false,
          isFoodAdmin: false,
        });
        console.log("Admin auth completed");
        // res.status(200).send({ isAdmin: true });
      } else {
        // res.status(200).json({ isAdmin: false });
        const token = user.generateAuthToken();
        const isuser = user.role === "user";
        res.status(200).send({
          tokdata: token,
          message: "user logged in successfully",
          isAdmin: false,
          isUser: isuser,
          isFoodAdmin: false,
        });
        // res.status(200).send({ isAdmin: false });
      }
    } else {
      // res.status(401).send("Invalid password");
      return res.status(401).send({ message: "Invalid userid or Password" });
    }
    // if (!validPassword)
    //   return res.status(401).send({ message: "Invalid userid or Password" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required().label("User ID"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
