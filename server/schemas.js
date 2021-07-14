const mongoose = require("mongoose");

const { Schema } = mongoose;

const entitySchema = new Schema({
  data: {
    name: { type: String, required: false },
    type: { type: String, required: false },
    image: { type: String, required: false },
    fuel: { type: Number, required: false },
    speed: { type: Number, required: false },
    engines: { type: Number, required: false },
    species: { type: String, required: false },
    functions: {type: [String], required: false},
  },
  position: {
    x: Number,
    y: Number,
  },
  type: { type: String, required: false },
  source: { type: mongoose.Types.ObjectId, required: false },
  target: { type: mongoose.Types.ObjectId, required: false },
});

const Entity = mongoose.model("Entity", entitySchema);

module.exports = { Entity };
