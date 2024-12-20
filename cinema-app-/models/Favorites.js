const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase UID
  filmIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }] // Référence à la collection 'movies'
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
