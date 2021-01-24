const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const ConflictError = require('../errors/conflict-err');

const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
    new: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
    new: true,
  },
  avatar: {
    type: String,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства
        const regex = /^http[s]{0,1}:\/\/[-._~:/?#[\]@!$&'()*+,;= 0-=a-zA-Z-]*/gm;
        return v.match(regex);
      },
      message: 'Ссылка не соответсвует требованиям валидации', // когда validator вернёт false, будет использовано это сообщение
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    new: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        // const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return validator.isEmail(v);
      },
      message: 'Почта не соответсвует требуемому формату',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

// добавим метод поиска пользователя findUserByCredentials к схеме пользователя
userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользовател по почте
  return this.findOne({ email }).select('+password') // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

// добавим метод создания пользоваля createUserByCredentials к схеме пользователя
userSchema.statics.createUserByCredentials = function createUser(
  name, about, avatar, email, password,
) {
  return this.findOne({ email })
    .then((user) => {
      if (user) {
        return Promise.reject(new ConflictError('Пользователь с таким email уже зарегистрирован!'));
      }
      // хешируем пароль
      return bcrypt.hash(password, saltRounds)
        .then((hash) => {
          if (!hash) {
            return Promise.reject(new Error('Ошибка хеширования!'));
          }
          // создаем юзера в базе
          return this.create({
            name, about, avatar, email, password: hash,
          })
            .then((you) => {
              if (!you) {
                return Promise.reject(new Error('Ошибка записи данных!'));
              }
              // ищем юзера и возвращаем данные без password
              return this.findOne({ email });
            });
        });
    });
};

module.exports = mongoose.model('user', userSchema);
