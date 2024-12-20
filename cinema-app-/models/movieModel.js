// models/movieModel.js
const mongoose = require('mongoose');
const Actor = require('./actorModel');
const Producer = require('./producerModel');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    siterating: { type: Number, required: true },
    categories: { type: [String], required: true },
    producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer', required: true },
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor', required: true }],
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
