// создали роутер
const router = require('express').Router();
const { getCards, createCard, removeCard } = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', removeCard);

// экспортировали роутер
module.exports = router;
