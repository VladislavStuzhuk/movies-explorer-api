const router = require('express').Router();
const { validateMovie, validateMovieId } = require('../middlewares/validation');

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMovie, postMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
