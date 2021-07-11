const mongoose = require("mongoose");

const { Schema } = mongoose;

const entitySchema = new Schema({
  data: {
    name: { type: String, required: false },
    image: { type: String, required: false },
  },
  position: {
    x: Number,
    y: Number,
  },
  type: String,
  source: { type: mongoose.Types.ObjectId, required: false },
  target: { type: mongoose.Types.ObjectId, required: false },
});

const Entity = mongoose.model("Entity", entitySchema);

module.exports = { Entity };
