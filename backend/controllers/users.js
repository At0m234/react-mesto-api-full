const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Произошла ошибка, не удалось найти пользователей');
      }
      res.status(200).send({ users });
    })
    .catch((err) => next(err));
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Неверный id пользователя');
      } else {
        res.status(200).send({ user });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return User.createUserByCredentials(name, about, avatar, email, password)
    // вернём записанные в базу данные
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Произошла ошибка, не удалось создать пользователя');
      }
      res.status(200).send({ data: user });
    })
    // данные не записались, вернём ошибку
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверная почта или пароль');
      }
      // аутентификация успешна! пользователь в переменной user
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      // вернём токен
      res.send({ token });
    })
    // возвращаем ошибку аутентификации
    .catch(next);
};
