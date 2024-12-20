const mongoose = require("mongoose");

const planningSchema = new mongoose.Schema({
  filmId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const Planning = mongoose.model("Planning", planningSchema);

module.exports = Planning;
