const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

router.use('/movies', auth, require('./movies'));
router.use('/users', auth, require('./users'));

router.use((req, res, next) => {
  next(new NotFoundError('Некорректный запрос'));
});
module.exports = router;
