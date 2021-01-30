const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// импортируем роутер пользователей
const users = require('./routes/users');
// импортируем роутер карточек
const cards = require('./routes/cards');
const NotFoundError = require('./errors/not-found-err');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).pattern(new RegExp('[A-Za-zА-Яа-яЁё -]{1,}')),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }).unknown(true),
}), createUser);

// app.get('/singup', () => {
//   throw new NotFoundError('Произошла ошибка, не удалось создать карточку');
// });

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).pattern(new RegExp('[A-Za-zА-Яа-яЁё -]{1,}')),
  }),
}), login);

// app.get('/singin', () => {
//   throw new NotFoundError('Произошла ошибка, не удалось создать карточку');
// });

// app.get('/*', () => {
//   throw new NotFoundError('Произошла ошибка, не удалось создать карточку');
// });

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/cards', cards);

app.use('/users', users);

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 404, message } = err;

  res
    .status(err.statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 404
        ? 'Нот фаунд'
        : message,
    });
  // вызываем next с аргументом-ошибкой
  next(new Error(err));
});

// здесь обрабатываем все ошибки
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(err.statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  // вызываем next с аргументом-ошибкой
  next(new Error(err));
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
