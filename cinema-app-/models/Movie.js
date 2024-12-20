const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    poster: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    siterating: { type: Number, required: true },
    nr: { type: Number, required: true },
    worldrating: { type: Number, required: true },
    producer: { type: String, required: true },
    actors: { type: [String], required: true },
    availability: { type: Boolean, required: true },
});

module.exports = mongoose.model("Movie", movieSchema);
