const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Favorite = require('../models/Favorite'); // Modèle Favorite

// Ajouter un film aux favoris
router.post('/add', async (req, res) => {
  const { userId, filmId } = req.body;

  if (!userId || !filmId) {
    return res.status(400).json({ message: 'User ID and Film ID are required.' });
  }

  try {
    // Vérifiez si le film existe dans la collection `movies`
    const filmExists = await mongoose.connection.collection('movies').findOne({ _id: mongoose.Types.ObjectId(filmId) });
    if (!filmExists) {
      return res.status(404).json({ message: 'Film not found in movies collection.' });
    }

    // Recherchez les favoris de l'utilisateur
    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      // Créer un nouveau document si aucun favori n'existe
      favorite = new Favorite({ userId, filmIds: [filmId] });
    } else if (!favorite.filmIds.includes(filmId)) {
      // Ajouter le film s'il n'est pas déjà présent
      favorite.filmIds.push(filmId);
    } else {
      return res.status(400).json({ message: 'Film already in favorites.' });
    }

    await favorite.save();
    res.status(200).json({ message: 'Film added to favorites.', favorite });
  } catch (error) {
    console.error('Error in /add route:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Récupérer les favoris d'un utilisateur
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  console.log('Fetching favorites for userId:', userId);

  try {
    // Recherchez les favoris de l'utilisateur et peupler les détails des films
    const favorite = await Favorite.findOne({ userId }).populate('filmIds');
    console.log('Favorite document found:', favorite);

    if (!favorite || favorite.filmIds.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user.' });
    }

    res.status(200).json({ favorites: favorite.filmIds });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
