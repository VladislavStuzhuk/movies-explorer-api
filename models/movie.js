const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    requierd: true,
  },
  durector: {
    type: String,
    requierd: true,
  },
  duration: {
    type: Number,
    requierd: true,
  },
  year: {
    type: String,
    requierd: true,
  },
  description: {
    type: String,
    requierd: true,
  },
  image: {
    type: String,
    requierd: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Ссылка невалидна',
    },
  },
  trailerLink: {
    type: String,
    requierd: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Ссылка невалидна',
    },
  },
  thumbnail: {
    type: String,
    requierd: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Ссылка невалидна',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    requierd: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    requierd: true,
  },
  nameEN: {
    type: String,
    requierd: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
