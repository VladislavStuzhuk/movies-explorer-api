const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const AccesError = require('../errors/acces-err');
const ValidationError = require('../errors/validation-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.postMovie = (req, res, next) => {
  const data = req.body;
  data.owner = req.user._id;

  Movie.create(data)
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании фильма'));
      } else next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        return Movie.findByIdAndRemove(req.params.movieId)
          .then((i) => res.send({ data: i }));
      }
      throw new AccesError('Ошибка доступа');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Указан некорректный id фильма.'));
      } else next(err);
    });
};
