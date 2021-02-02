// создали роутер
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, removeCard } = require('../controllers/cards');

const linkRegExp = /^http[s]{0,1}:\/\/[-._~:\/?#[\]@!$&'()*+,;= 0-=a-zA-Z-]*/;
const schema = Joi.object({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string()
    .pattern(new RegExp(linkRegExp)),
});

router.get('/', getCards);

router.post('/', celebrate({
  body: schema,
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().length(24),
  }),
}), removeCard);

// экспортировали роутер
module.exports = router;
