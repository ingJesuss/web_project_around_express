const express = require('express');

const router = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.controller');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/like', likeCard);
router.delete('/:cardId/dislike', dislikeCard);

module.exports = router;
