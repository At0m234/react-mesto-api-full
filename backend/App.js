const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// импортируем роутер пользователей
const users = require('./routes/users');
// импортируем роутер карточек
const cards = require('./routes/cards');
// Слушаем 3000 порт
const { PORT = 3000, BASE__PATH = 'http://localhost:3000/' } = process.env;

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

app.use(requestLogger); // подключаем логгер запросов

// роуты, не требующие авторизации,
// например, регистрация и логин
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/cards', cards);

app.use('/users', users);

app.use('*', (req, res) => {
  const ERROR_CODE = 404;
  res.status(ERROR_CODE).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

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
  next(new Error('Ошибка авторизации'));
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Link to the server ${BASE__PATH}`);
});
