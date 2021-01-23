const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String,
    required: true,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства
        const regex = /^http[s]{0,1}:\/\/[-._~:/?#[\]@!$&'()*+,;= 0-=a-zA-Z-]*/gm;
        return v.match(regex);
      },
      message: 'Ссылка не соответсвует требованиям валидации', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  owner: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
