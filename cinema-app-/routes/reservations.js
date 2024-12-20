const express = require('express');
const router = express.Router();
const Reservation = require('../models/');

// Créer une réservation
router.post('/add', async (req, res) => {
    const { userId, filmId, date, time, seats } = req.body;

    if (!userId || !filmId || !date || !time || !seats) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const reservation = new Reservation({ userId, filmId, date, time, seats });
        await reservation.save();
        res.status(200).json({ message: 'Reservation successful', reservation });
    } catch (error) {
        console.error('Error in reservation route:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Récupérer les réservations d'un utilisateur
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const reservations = await Reservation.find({ userId }).populate('filmId');
        res.status(200).json({ reservations });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;
