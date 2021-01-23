// создали роутер
const router = require('express').Router();
const { getUsers, getMe } = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

// экспортировали роутер
module.exports = router;
