// models/producerModel.js
const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
});

const Producer = mongoose.model('Producer', producerSchema);
module.exports = Producer;
