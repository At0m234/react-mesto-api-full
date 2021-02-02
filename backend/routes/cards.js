// создали роутер
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, removeCard } = require('../controllers/cards');

const linkRegExp = /^http[s]{0,1}:\/\/[-._~:/?#[\]@!$&'()*+,;= 0-=a-zA-Z-]*/;

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }).pattern(/^http[s]{0,1}:\/\/[-._~:/?#[\]@!$&'()*+,;= 0-=a-zA-Z-]*/),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().length(24),
  }),
}), removeCard);

// экспортировали роутер
module.exports = router;
