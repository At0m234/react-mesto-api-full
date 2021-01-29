// создали роутер
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getMe } = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
}), getMe);

// экспортировали роутер
module.exports = router;
