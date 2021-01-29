const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const NoRightsErr = require('../errors/no-rights-err');
const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name, link, owner: req.user._id, likes: [],
  })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Произошла ошибка, не удалось создать карточку');
      }
      res.send({ card });
    })
    .catch((err) => next(err));
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Произошла ошибка, не удалось найти карточки');
      } else {
        res.send({ cards });
      }
    })
    .catch((err) => next(err));
};

module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      } else if (String(card.owner[0]) !== String(req.user._id)) {
        throw new NoRightsErr('У Вас нет прав на удаление карточек других пользователей');
      } else if (String(req.params.cardId) !== String(card._id)) {
        throw new BadRequestError('Неверный id карточки');
      }
      card.remove()
        .then((deleted) => {
          res.status(200).send({ deleted });
        });
    })
    .catch((err) => next(err));
};
