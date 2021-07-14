const mongoose = require("mongoose");

const { Schema } = mongoose;

const entitySchema = new Schema({
  data: {
    name: { type: String, default: "" },
    type: { type: String, default: "vessel" },
    image: { type: String, default: "/noImage.png" },
    fuel: { type: Number, default: 117 },
    speed: { type: Number, default: 1000 },
    engines: { type: Number, default: 2 },
    species: { type: String, required: "Human" },
    functions: [String],
  },
  position: {
    x: Number,
    y: Number,
  },
  type: { type: String, default: "custom" },
  source: { type: mongoose.Types.ObjectId, required: false },
  target: { type: mongoose.Types.ObjectId, required: false },
});

const Entity = mongoose.model("Entity", entitySchema);

module.exports = { Entity };
