// models/actorModel.js
const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    character: { type: String, required: true },
});

const Actor = mongoose.model('Actor', actorSchema);
module.exports = Actor;
