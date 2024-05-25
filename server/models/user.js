const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  lat: Number,
  lon: Number,
  role: String,
});

userSchema.methods.generateAuthToken = function () {
  const payload = {
    id: this._id,
    userId: this.userId,
    name: this.name,
    email: this.email,
    location: this.location,
    lat: this.lat,
    lon: this.lon,
    role: this.role,
  };
  const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required().label("User ID"),
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    location: Joi.string().required().label("Location"),
    role: Joi.string().required().label("Role"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };

// inside schema
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
