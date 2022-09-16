require('dotenv').config();
const helmet = require('helmet');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorsHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

const { NODE_ENV, PORT = 3000, DATABASE_URL } = process.env;
const app = express();
app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/moviesdb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());
app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);
app.listen(PORT);
