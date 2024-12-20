const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    filmId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Movie' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    seats: { type: Number, required: true },
});

module.exports = mongoose.model('Reservation', reservationSchema);
