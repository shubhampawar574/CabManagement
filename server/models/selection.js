const mongoose = require("mongoose");
const Joi = require("joi");

// User selection schema
const selectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  comeToOffice: String, // 'Yes' or 'No'
  periodOfDay: String, // 'Morning', 'Afternoon', or 'Night'
});
const Selection = mongoose.model("Selection", selectionSchema);

const validate = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required().label("User ID"),
    comeToOffice: Joi.string().required().label("Come to Office"),
    periodOfDay: Joi.string().required().label("Period of Day"),
  });
  return schema.validate(data);
};

module.exports = { Selection, validate };
