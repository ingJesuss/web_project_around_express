const Card = require('../models/Card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((err) => {
      console.error('Error al obtener las cards:', err);
      res.status(500).json('Error al obtener las cards');
    });
};

// crear nueva tarjeta
const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, ownerId })
    .then((newCard) => {
      res.status(201).json(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ msg: 'Error interno del servidor' });
      }
    });
};

// eliminar card
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new Error('Card no encontrada'))
    .then((card) => {
      card.deleteOne().then(() => {
        res.status(200).json({ msg: 'Card eliminada' });
      });
    })
    .catch((err) => {
      // Ahora el catch maneja todos los errores
      if (err.msg === 'Tarjeta no encontrada') {
        return res.status(404).send({ msg: err.msg });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ msg: 'ID de tarjeta con formato inválido' });
      }
      res.status(500).send({ msg: 'Error en el servidor' });
    });
};

// like card
const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // Agrega el ID del usuario al array de likes
    { new: true },
  )
    .orFail(new Error('Tarjeta no encontrada'))
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      if (err.message === 'Tarjeta no encontrada') {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta inválido' });
      }
      res.status(500).send({ message: 'Error en el servidor' });
    });
};

// dislike card
const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // Elimina el ID del usuario del array de likes
    { new: true },
  )
    .orFail(new Error('Tarjeta no encontrada'))
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      if (err.message === 'Tarjeta no encontrada') {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta inválido' });
      }
      res.status(500).send({ message: 'Error en el servidor' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
